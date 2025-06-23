import { ArchiveService } from "services/archive/archivesService";
import { Archive } from "models/live";
import { IArchiveRepository } from "repositories/database/archive/archiveInterface";
import * as dotenv from "dotenv";
dotenv.config();

function createMockRepository(): IArchiveRepository {
  const mockRepository: IArchiveRepository = {
    fetch: jest.fn().mockRejectedValue(new Error("function not implemented")),
    searchByTitle: jest.fn().mockRejectedValue(new Error("function not implemented")),
  };
  return mockRepository;
}

function createMockArchiveList(num: number): Archive[] {
  const archiveList: Archive[] = [];

  for (let index = 0; index < num; index++) {
    const archive: Archive = {
      id: index,
      outer_link: `outer_link_${index}`,
      talents_id: index + 1,
      video_title: `video_title_${index}`,
      video_thumbnail: `video_thumbnail_${index}`,
      open_date: new Date(),
    };
    archiveList.push(archive);
  }
  return archiveList;
}

describe("ArchiveService", () => {
  describe("fetch", () => {
    it("should return 5 archive", async () => {
      const archiveList: Archive[] = createMockArchiveList(5);
      const mockRepository = createMockRepository();
      mockRepository.fetch = jest.fn().mockResolvedValue(archiveList);

      const service = new ArchiveService(mockRepository);
      const result = await service.fetch(1);

      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(5);

      for (let index = 0; index < archiveList.length; index++) {
        expect(result[index].id).toBe(archiveList[index].id);
        expect(result[index].outer_link).toBe(archiveList[index].outer_link);
        expect(result[index].talents_id).toBe(archiveList[index].talents_id);
        expect(result[index].video_title).toBe(archiveList[index].video_title);
        expect(result[index].video_thumbnail).toBe(archiveList[index].video_thumbnail);
        expect(result[index].open_date).toBe(archiveList[index].open_date);
      }
    });

    it("should return repository error", async () => {
      const mockRepository = createMockRepository();
      mockRepository.fetch = jest.fn().mockResolvedValue(new Error("repository error"));

      const service = new ArchiveService(mockRepository);
      const result = await service.fetch(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because an error has not occurred");
      }

      expect(result.message).toBe("repository error");
    });
  });
});
