import { Nowstreaming } from "models/live";

export interface INowstrRepository {
  fetch(offset: number): Promise<Nowstreaming[] | Error>;
  searchByTitle(keyword: string): Promise<Nowstreaming[] | Error>;
}
