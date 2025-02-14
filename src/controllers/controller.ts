import { Router, Request, Response } from "express";
import { Talents, Games, Talents_Games } from "models/live";
import { }

export class liveController {
  private liveService: LiveService;
  public router: Router;

  constructor(liveService: LiveService) {
    this.liveService = liveService;
    this.router = Router();
  }
}
