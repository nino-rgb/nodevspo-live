import { Games } from "models/live";

export interface IGameService {
  findAll(): Promise<Games[] | Error>;
  getById(id: number): Promise<Games | Error>;
  create(talents: Games): Promise<number | Error>;
  update(id: number, games: Games): Promise<void | Error>;
  delete(id: number): Promise<void | Error>;
}
