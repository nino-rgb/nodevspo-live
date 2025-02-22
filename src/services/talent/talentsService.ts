import { Talents } from "models/live";
import { ITalentRepository } from "repository/talent/talentInterface";
import { ITarentsService } from "./talentsInterface";

export class TalentsService implements ITarentsService {
  private talentsRepository: ITalentRepository;

  constructor(talentsRepository: ITalentRepository) {
    this.talentsRepository = talentsRepository;
  }

  public async findAll(): Promise<Talents[] | Error> {
    const result = await this.talentsRepository.findAll();
    return result;
  }
}
