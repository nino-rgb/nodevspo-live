import { Archives } from "models/live";
import { IArchiveRepository } from "repositories/database/archive/archiveInterface";
import { IArchiveService } from "./archivesInterface";
// import { convertUtcToJst } from "../../utils/dateUtil";
export class ArchivesService implements IArchiveService {
  private archivesRepository: IArchiveRepository;

  constructor(archivesRepository: IArchiveRepository) {
    this.archivesRepository = archivesRepository;
  }

  public async fetch(offset: string): Promise<Archives[] | Error> {
    const result = await this.archivesRepository.fetch(offset);
    return result;
  }
}
