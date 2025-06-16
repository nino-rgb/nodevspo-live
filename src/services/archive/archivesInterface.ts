import { Archive } from "models/live";

export interface IArchiveService {
  fetch(offset: number): Promise<Archive[] | Error>;
  search(keyword: string): Promise<Archive[] | Error>;
}
