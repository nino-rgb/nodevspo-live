import { Archives } from "models/live";
import { IArchiveRepository } from "repositories/database/archive/archiveInterface";
import { IArchiveService } from "./archivesInterface";

export class ArchivesService implements IArchiveService {
  private archivesRepository: IArchiveRepository;

  constructor(archivesRepository: IArchiveRepository) {
    this.archivesRepository = archivesRepository;
  }

  public async findAll(): Promise<Archives[] | Error> {
    const result = await this.archivesRepository.findAll();
    return result;
  }
}
