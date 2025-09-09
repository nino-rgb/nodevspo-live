import cron from "node-cron";
import { FetchArchiveVideosByYoutube, FetchNowstrVideosByYoutube } from "../../repositories/outerAPI/youtubeAPI";
import { YouTubeService } from "./youtubeArchiveService";
import { ArchiveRepository } from "../../repositories/database/archive/archiveRepository";
import { TalentRepository } from "../../repositories/database/talent/talentRepository";
import { createDBConnection } from "../../utils/database";
import { NowstrRepository } from "../../repositories/database/nowstreaming/nowstrRepository";

(async () => {
  const connection = await createDBConnection();

  const archiveRepo = new ArchiveRepository(connection);
  const talentRepo = new TalentRepository(connection);
  const nowstrRepo = new NowstrRepository(connection);
  const youtubeService = new YouTubeService(talentRepo, archiveRepo, nowstrRepo);
  // 即時実行
  (async () => {
    const fetchedArchives = await FetchArchiveVideosByYoutube();
    const fetchedNowstreamings = await FetchNowstrVideosByYoutube();

    if (fetchedArchives instanceof Error) {
      console.error("即時実行 YouTube APIエラー:", fetchedArchives.message);
    } else {
      const result1 = await youtubeService.saveValidArchives(fetchedArchives);
      if (result1 instanceof Error) {
        console.error("即時実行 アーカイブ保存エラー:", result1.message);
      } else {
        console.log("即時実行 アーカイブ初回保存完了");
      }
    }

    if (fetchedNowstreamings instanceof Error) {
      console.error("即時実行 YouTube APIエラー:", fetchedNowstreamings.message);
    } else {
      const result1 = await youtubeService.saveValidNowstreamings(fetchedNowstreamings);
      if (result1 instanceof Error) {
        console.error("即時実行 配信中保存エラー:", result1.message);
      } else {
        console.log("即時実行 配信中初回保存完了");
      }
    }
  })();

  // 1時間ごとに実行（毎時0分）
  cron.schedule("0 * * * *", async () => {
    console.log("[cron] YouTube定期取得");

    const fetched = await FetchArchiveVideosByYoutube();

    if (fetched instanceof Error) {
      console.error("[cron] YouTube APIエラー:", fetched.message);
      return;
    }

    const result = await youtubeService.saveValidArchives(fetched);

    if (result instanceof Error) {
      console.error("[cron] 保存エラー:", result.message);
    } else {
      console.log("[cron] YouTubeアーカイブ保存完了");
    }
  });
})();
