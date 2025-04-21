import { Archives } from "models/live";

export interface IArchiveService {
  findAll(): Promise<Archives[] | Error>;
}
