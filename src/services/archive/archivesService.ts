import { Archive } from "models/live";
import { IArchiveRepository } from "repositories/database/archive/archiveInterface";
import { IArchiveService } from "./archivesInterface";
// import { convertUtcToJst } from "../../utils/dateUtil";
export class ArchiveService implements IArchiveService {
  private archiveRepository: IArchiveRepository;

  constructor(archiveRepository: IArchiveRepository) {
    this.archiveRepository = archiveRepository;
  }

  public async fetch(offset: string): Promise<Archive[] | Error> {
    const result = await this.archiveRepository.fetch(offset);
    return result;
  }
}
