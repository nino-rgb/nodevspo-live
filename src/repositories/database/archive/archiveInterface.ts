import { Archive } from "models/live";

export interface IArchiveRepository {
  fetch(offset: number): Promise<Archive[] | Error>;
}
