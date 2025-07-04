import { Nowstreaming } from "models/live";

export interface INowstrService {
  fetch(offset: number): Promise<Nowstreaming[] | Error>;
  search(keyword: string): Promise<Nowstreaming[] | Error>;
  fetchByTalentId(talentId: number): Promise<Nowstreaming[] | Error>;
}
