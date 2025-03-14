import { Talents } from "models/live";

export interface ITarentsService {
  findAll(): Promise<Talents[] | Error>;
  getById(id: number): Promise<Talents | Error>;
}
