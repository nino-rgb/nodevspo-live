import { Archive } from "models/live";
import { IArchiveRepository } from "repositories/database/archive/archiveInterface";
import { IArchiveService } from "./archivesInterface";
// import { convertUtcToJst } from "../../utils/dateUtil";
export class ArchiveService implements IArchiveService {
  private archiveRepository: IArchiveRepository;

  constructor(archiveRepository: IArchiveRepository) {
    this.archiveRepository = archiveRepository;
  }

  public async fetch(offset: number): Promise<Archive[] | Error> {
    const result = await this.archiveRepository.fetch(offset);
    return result;
  }

  public async search(keyword: string): Promise<Archive[] | Error> {
    return this.archiveRepository.searchByTitle(keyword);
  }

  public async fetchByTalentId(talentId: number): Promise<Archive[] | Error> {
    return this.archiveRepository.fetchByTalentId(talentId);
  }

  public async deleteByTalentId(talentId: number): Promise<void | Error> {
    return this.archiveRepository.deleteByTalentId(talentId);
  }
}
