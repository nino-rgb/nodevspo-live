import { Nowstreaming } from "models/live";

export interface INowstrService {
  fetch(offset: number): Promise<Nowstreaming[] | Error>;
}
