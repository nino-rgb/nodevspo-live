import { Nowstreaming } from "models/live";

export interface INowstrRepository {
  fetch(offset: number): Promise<Nowstreaming[] | Error>;
  searchByTitle(keyword: string): Promise<Nowstreaming[] | Error>;
  fetchByTalentId(talentId: number): Promise<Nowstreaming[] | Error>;
  findExistingVideoIds(videoIds: string[]): Promise<string[]>;
  deleteByTalentId(talentId: number): Promise<void | Error>;
}
