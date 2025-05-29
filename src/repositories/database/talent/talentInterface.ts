import { Talent } from "models/live";

export interface ITalentRepository {
  findAll(): Promise<Talent[] | Error>;
  getById(id: number): Promise<Talent | Error>;
}
