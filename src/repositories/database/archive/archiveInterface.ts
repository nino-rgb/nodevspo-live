import { Archive } from "models/live";

export interface IArchiveRepository {
  fetch(offset: number): Promise<Archive[] | Error>;
  searchByTitle(keyword: string): Promise<Archive[] | Error>;
  fetchByTalentId(talentId: number): Promise<Archive[] | Error>;
  deleteByTalentId(talentId: number): Promise<void | Error>;
  findExistingVideoIds(videoIds: string[]): Promise<string[]>;
}
