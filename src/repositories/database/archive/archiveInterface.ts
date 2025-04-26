import { Archives } from "models/live";

export interface IArchiveRepository {
  fetch(offset: string): Promise<Archives[] | Error>;
}
