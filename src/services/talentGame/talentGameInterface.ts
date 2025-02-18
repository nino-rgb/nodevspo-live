import { TalentGames } from "models/live";

export interface ITalentGamesService {
  findAll(): Promise<TalentGames[] | Error>;
  getById(id: number): Promise<TalentGames | Error>;
  create(talents: TalentGames): Promise<number | Error>;
  update(id: number, TalentGames: TalentGames): Promise<void | Error>;
  delete(id: number): Promise<void | Error>;
}
