import { Talents } from "models/live";

export interface ITalentRepository {
  findAll(): Promise<Talents[] | Error>;
  // getById(id: number): Promise<Talents | Error>;
  // create(todo: Talents): Promise<number | Error>;
  // update(id: number, talent: Talents): Promise<void | Error>;
  // delete(id: number): Promise<void | Error>;
}
