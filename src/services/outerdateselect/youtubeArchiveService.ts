import { TalentRepository } from "../../repositories/database/talent/talentRepository";
import { ArchiveRepository } from "../../repositories/database/archive/archiveRepository";
import { FetchedVideo, Archive } from "models/live";

export class YouTubeService {
  private talentRepository: TalentRepository;
  private archiveRepository: ArchiveRepository;

  constructor(talentRepo: TalentRepository, archiveRepo: ArchiveRepository) {
    this.talentRepository = talentRepo;
    this.archiveRepository = archiveRepo;
  }

  public async saveValidVideos(fetchedVideos: FetchedVideo[]): Promise<void | Error> {
    //配列を受け取り該当動画をDBに保存
    try {
      const talents = await this.talentRepository.findAll(); //タレント情報をDBから取得

      if (talents instanceof Error) {
        return talents;
      }

      const channelIdMap = new Map<string, number>(talents.map((talent) => [talent.youtube_channel_id, talent.id])); //チャンネルIDごとにタレントを検索できるようにMAP作成(reactbasiclesson)

      const fetchedVideoIds = fetchedVideos.map((v) => v.videoId); //すでにある動画を取得
      const existingVideoIds = await this.archiveRepository.findExistingVideoIds(fetchedVideoIds);
      const validArchives: Archive[] = []; // 取得した動画から、タレントのチャンネルIDに一致するものだけを抽出して、保存用に整形

      for (const video of fetchedVideos) {
        const talentId = channelIdMap.get(video.channelId);
        if (!talentId) continue; //データをチェック一致しなければ無視
        if (existingVideoIds.includes(video.videoId)) continue; //保存済みの動画をスキップ

        validArchives.push({
          outer_link: `https://youtu.be/${video.videoId}`,
          talent_id: talentId,
          video_title: video.title,
          video_thumbnail: video.thumbnail,
          open_date: new Date(video.publishedAt),
        });
      }

      if (validArchives.length > 0) {
        const targetTalentIds = Array.from(new Set(validArchives.map((a) => a.talent_id)));
        for (const tid of targetTalentIds) {
          await this.archiveRepository.deleteByTalentId(tid);
        }

        await this.archiveRepository.bulkInsert(validArchives);
      }
    } catch (error) {
      return new Error(`YouTubeService.saveValidVideos Error: ${error}`);
    }
  }
}
