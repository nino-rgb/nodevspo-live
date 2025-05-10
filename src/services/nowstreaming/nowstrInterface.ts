import { Nowstreamings } from "models/live";

export interface INowstrService {
  fetch(offset: string): Promise<Nowstreamings[] | Error>;
}
