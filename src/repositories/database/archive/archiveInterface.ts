import { Archive } from "models/live";

export interface IArchiveRepository {
  fetch(offset: string): Promise<Archive[] | Error>;
}
