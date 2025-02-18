import { Talents } from "models/live";

export interface ITarentsService {
  findAll(): Promise<Talents[] | Error>;
  getById(id: number): Promise<Talents | Error>;
  create(talents: Talents): Promise<number | Error>;
  update(id: number, talents: Talents): Promise<void | Error>;
  delete(id: number): Promise<void | Error>;
}
