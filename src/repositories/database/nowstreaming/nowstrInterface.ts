import { Nowstreaming } from "models/live";

export interface INowstrRepository {
  fetch(offset: string): Promise<Nowstreaming[] | Error>;
}
