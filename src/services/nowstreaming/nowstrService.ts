import { Nowstreaming } from "models/live";
import { INowstrRepository } from "repositories/database/nowstreaming/nowstrInterface";
import { INowstrService } from "./nowstrInterface";
import { off } from "process";
import { publicDecrypt } from "crypto";

export class NowstrService implements INowstrService {
  private nowstrRepository: INowstrRepository;

  constructor(nowstrRepository: INowstrRepository) {
    this.nowstrRepository = nowstrRepository;
  }

  public async fetch(offset: number): Promise<Nowstreaming[] | Error> {
    const result = await this.nowstrRepository.fetch(offset);
    return result;
  }

  public async search(keyword: string): Promise<Nowstreaming[] | Error> {
    return this.nowstrRepository.searchByTitle(keyword);
  }

  public async fetchByTalentId(talentId: number): Promise<Nowstreaming[] | Error> {
    return this.nowstrRepository.fetchByTalentId(talentId);
  }
  public async deleteByTalentId(talentId: number): Promise<void | Error> {
    return this.nowstrRepository.deleteByTalentId(talentId);
  }
}
