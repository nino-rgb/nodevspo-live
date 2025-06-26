import { Talent } from "models/live";

export interface ITarentService {
  findAll(): Promise<Talent[] | Error>;
  getById(id: number): Promise<Talent | Error>;
  search(keyword: string): Promise<Talent[] | Error>;
}
