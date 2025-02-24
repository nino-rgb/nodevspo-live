import { Talents } from "models/live";

export interface ITalentRepository {
  findAll(): Promise<Talents[] | Error>;
  getById(id: number): Promise<Talents | Error>;
}
