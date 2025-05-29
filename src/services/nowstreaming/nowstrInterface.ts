import { Nowstreaming } from "models/live";

export interface INowstrService {
  fetch(offset: string): Promise<Nowstreaming[] | Error>;
}
