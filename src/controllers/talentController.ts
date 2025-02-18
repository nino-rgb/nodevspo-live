import { Router, Request, Response, response } from "express";
import { TalentsService } from "services/talent/talentsService";
import { Talents } from "models/live";

export class TalentsController {
  private talentsService: TalentsService;
  public router: Router;

  constructor(talentsService: TalentsService) {
    this.talentsService = talentsService;
    this.router = Router();
  }
}
