import { Archives } from "models/live";

export interface IArchiveRepository {
  findAll(): Promise<Archives[] | Error>;
}
