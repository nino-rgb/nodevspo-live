import { Talent, TalentTwitchRow } from "models/live";

export interface ITalentRepository {
  findAll(): Promise<Talent[] | Error>;
  getById(id: number): Promise<Talent | Error>;
  searchByName(keyword: string): Promise<Talent[] | Error>;
  findAllWithTwitchLogin(): Promise<TalentTwitchRow[] | Error>;
  findMissingTwitchUserId(): Promise<TalentTwitchRow[] | Error>;
  updateTwitchUserIdByLogin(login: string, userId: string): Promise<void | Error>;
}
