import "dotenv/config";
import cron from "node-cron";
import { createDBConnection } from "../../utils/database";
import { TalentRepository } from "../../repositories/database/talent/talentRepository";
import { TwitchAuthService } from "../auth/twitchAuthService";
import { getStreamsByUserIds } from "../../repositories/outerAPI/twitchAPI";
import type { TalentTwitchRow } from "models/live";

// 1時間おきに実行(毎時0分)
const SCHEDULE = "0 * * * *";
const TIMEZONE = "Asia/Tokyo";

console.log("[twitchScheduler] module loaded");

async function runOnce() {
  const runId = Date.now().toString(36);
  const startedAt = new Date();
  console.log(`[twitchScheduler] start ${startedAt.toISOString()}`);

  const conn = await createDBConnection();
  try {
    const repo = new TalentRepository(conn);
    //talentsから twitch_user_idを取る(loginだけの行を事前に埋めておく運用)
    const rows = await repo.findAllWithTwitchLogin();
    if (rows instanceof Error) throw rows;
    //user_idがあるものを対象に
    const ids = (rows as TalentTwitchRow[]).map((r) => r.twitch_user_id).filter((id): id is string => !!id);

    if (ids.length === 0) {
      console.log("[twitchScheduler] no twitch_ user_id rows. skip");
      return;
    }

    //トークンを取得
    const auth = new TwitchAuthService();
    const token = await auth.getAppAccessToken();
    const clientId = process.env.TWITCH_CLIENT_ID as string;

    const { data: streams } = await getStreamsByUserIds(token, clientId, ids);
    //配信中のみかえる､user_id の streamのMapを作成

    type TwitchStream = {
      user_id: string;
      user_login: string;
      user_name: string;
      title: string;
      game_name: string;
      viewer_count: number;
      started_at: string;
      thumbnail_url: string;
    };
    const streamByUserId = new Map<string, TwitchStream>((streams as TwitchStream[]).map((s) => [s.user_id, s]));

    const report = (rows as TalentTwitchRow[]).map((r) => {
      const s = r.twitch_user_id ? streamByUserId.get(r.twitch_user_id) : undefined;
      return {
        talent_id: r.id,
        name: r.name,
        twitch_login: r.twitch_login,
        twitch_user_id: r.twitch_user_id,
        is_live: Boolean(s),
        title: s?.title ?? "",
        game_name: s?.game_name ?? "",
        viewer_count: s?.viewer_count ?? 0,
        started_at: s?.started_at ? new Date(s.started_at) : null, // MySQL DATETIMEにそのまま入る
        thumbnail_url: s?.thumbnail_url ? String(s.thumbnail_url).replace("{width}x{height}", "320x180") : "",
      };
    });
    console.log(`[twitchScheduler][${runId}] report built. live=${report.filter((r) => r.is_live).length}`);
    await conn.beginTransaction();
    try {
      for (const r of report) {
        if (r.is_live) {
          // 配信中ならまずツイッチのID持ってるタレントのnowstreamingsに入ってるデータを消すその後insertするyoutubeの分は関係ない
          // https://twitch.tv/%で検索して削除する
          await conn.execute(
            `DELETE FROM nowstreamings WHERE talent_id = ?  AND outer_link LIKE 'https://twitch.tv/%'`,
            [r.talent_id],
          );

          await conn.execute(
            `INSERT INTO nowstreamings
               (outer_link, talent_id, video_title, video_thumbnail, open_date, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [
              `https://twitch.tv/${r.twitch_login ?? ""}`,
              r.talent_id,
              r.title,
              r.thumbnail_url,
              r.started_at ?? new Date(), // started_at不明なら現在時刻
            ],
          );
        } else {
          // 配信してないならツイッチのID持ってるタレントのnowstreamingsに入ってるデータを消すyoutubeの分は関係ない
          await conn.execute(
            `DELETE FROM nowstreamings WHERE talent_id = ?  AND outer_link LIKE 'https://twitch.tv/%'`,
            [r.talent_id],
          );
        }
      }
      await conn.commit();
      console.log(`[twitchScheduler][${runId}] DB commit OK`);
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  } catch (e: any) {
    if (e?.response) {
      console.error(`[twitchScheduler][${runId}] HTTP error`, e.response.status, e.response.data);
    } else {
      console.error(`[twitchScheduler][${runId}] error:`, e?.message || e);
    }
  } finally {
    await conn.end();
    console.log("[twitchScheduler] end");
  }
}
console.log("[twitchScheduler] module loaded");
runOnce(); // 起動直後に必ず一度実行
cron.schedule(SCHEDULE, runOnce, { timezone: TIMEZONE });
console.log("[twitchScheduler] scheduled:", SCHEDULE, TIMEZONE);
