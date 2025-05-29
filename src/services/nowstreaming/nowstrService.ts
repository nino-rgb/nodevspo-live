import { Nowstreaming } from "models/live";
import { INowstrRepository } from "repositories/database/nowstreaming/nowstrInterface";
import { INowstrService } from "./nowstrInterface";

export class NowstrService implements INowstrService {
  private nowstrRepository: INowstrRepository;

  constructor(nowstrRepository: INowstrRepository) {
    this.nowstrRepository = nowstrRepository;
  }

  public async fetch(offset: string): Promise<Nowstreaming[] | Error> {
    const result = await this.nowstrRepository.fetch(offset);
    return result;
  }
}
