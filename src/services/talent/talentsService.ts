import { Talent } from "models/live";
import { ITalentRepository } from "../../repositories/database/talent/talentInterface";
import { ITarentService } from "./talentsInterface";
import { ErrorRequestHandler } from "express";

export class TalentService implements ITarentService {
  private talentsRepository: ITalentRepository;

  constructor(talentsRepository: ITalentRepository) {
    this.talentsRepository = talentsRepository;
  }

  public async findAll(): Promise<Talent[] | Error> {
    const result = await this.talentsRepository.findAll();
    return result;
  }

  public async getById(id: number): Promise<Talent | Error> {
    const result = await this.talentsRepository.getById(id);
    return result;
  }

  public async search(keyword: string): Promise<Talent[] | Error> {
    const result = await this.talentsRepository.searchByName(keyword);
    return result;
  }
}
