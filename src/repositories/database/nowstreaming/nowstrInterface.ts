import { Nowstreaming } from "models/live";

export interface INowstrRepository {
  fetch(offset: number): Promise<Nowstreaming[] | Error>;
}
