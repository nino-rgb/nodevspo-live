import { Archives } from "models/live";

export interface IArchiveService {
  fetch(offset: string): Promise<Archives[] | Error>;
}
