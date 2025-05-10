import { Nowstreamings } from "models/live";

export interface INowstrRepository {
  fetch(offset: string): Promise<Nowstreamings[] | Error>;
}
