import { YouTubeService } from "../../../services/outerdateselect/youtubeArchiveService";
import { ArchiveRepository } from "../../../repositories/database/archive/archiveRepository";
import { TalentRepository } from "../../../repositories/database/talent/talentRepository";
import { FetchedVideo } from "models/live";

describe("YouTubeService.saveValidVideos with delete", () => {
  it("should delete old archives and insert new ones", async () => {
    const mockTalents = [{ id: 1, youtube_channel_id: "abc123" }];

    const fetchedVideos: FetchedVideo[] = [
      {
        videoId: "new123",
        channelId: "abc123",
        title: "New Video",
        thumbnail: "thumb.jpg",
        publishedAt: "2025-07-09T12:00:00Z",
      },
    ];

    const mockDeleteByTalentId = jest.fn();
    const mockBulkInsert = jest.fn();

    const mockTalentRepo = {
      findAll: jest.fn().mockResolvedValue(mockTalents),
    } as unknown as TalentRepository;

    const mockArchiveRepo = {
      deleteByTalentId: mockDeleteByTalentId,
      bulkInsert: mockBulkInsert,
    } as unknown as ArchiveRepository;

    const service = new YouTubeService(mockTalentRepo, mockArchiveRepo);

    await service.saveValidVideos(fetchedVideos);

    //削除が呼ばれているか
    expect(mockDeleteByTalentId).toHaveBeenCalledWith(1);

    //挿入もされているか
    expect(mockBulkInsert).toHaveBeenCalledWith([
      {
        outer_link: "https://youtu.be/new123",
        talent_id: 1,
        video_title: "New Video",
        video_thumbnail: "thumb.jpg",
        open_date: new Date("2025-07-09T12:00:00Z"),
      },
    ]);
  });

  it("should return ");
});
