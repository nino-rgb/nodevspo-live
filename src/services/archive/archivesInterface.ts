import { Archive } from "models/live";

export interface IArchiveService {
  fetch(offset: string): Promise<Archive[] | Error>;
}
