import cron from "node-cron";
import { FetchVideosByYoutube } from "../../repositories/outerAPI/youtubeAPI";
import { YouTubeService } from "./youtubeArchiveService";
import { ArchiveRepository } from "../../repositories/database/archive/archiveRepository";
import { TalentRepository } from "../../repositories/database/talent/talentRepository";
import { createDBConnection } from "../../utils/database";
import { NowstrRepository } from "../../repositories/database/nowstreaming/nowstrRepository";

(async () => {
  const connection = await createDBConnection();

  const archiveRepo = new ArchiveRepository(connection);
  const talentRepo = new TalentRepository(connection);
  const youtubeService = new YouTubeService(talentRepo, archiveRepo);
  const nowstrRepo = new NowstrRepository(connection);
  // 即時実行
  (async () => {
    const fetched = await FetchVideosByYoutube();

    if (fetched instanceof Error) {
      console.error("即時実行 YouTube APIエラー:", fetched.message);
    } else {
      const result1 = await youtubeService.saveValidArchives(fetched);
      if (result1 instanceof Error) {
        console.error("即時実行 保存エラー:", result1.message);
      } else {
        console.log("即時実行 初回保存完了");
      }
    }

    const result2 = await youtubeService.saveNowstreamings(fetched);
    if (result2 instanceof Error) {
      console.error("即時実行 保存エラー(nowstreamings):", result2.message);
    } else {
      console.log("即時実行 nowstreamings 保存完了");
    }
  })();

  // 1時間ごとに実行（毎時0分）
  cron.schedule("0 * * * *", async () => {
    console.log("[cron] YouTube定期取得");

    const fetched = await FetchVideosByYoutube();

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
