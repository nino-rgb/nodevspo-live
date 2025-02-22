import { Router, Request, Response, response } from "express";
import { TalentsService } from "services/talent/talentsService";
import { Talents } from "models/live";

export class TalentsController {
  private talentsService: TalentsService;
  public router: Router;

  constructor(talentsService: TalentsService) {
    this.talentsService = talentsService;
    this.router = Router();

    this.router.get("/talent", async (req: Request, res: Response) => {
      const result = await this.talentsService.findAll();

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
    });
  }
}
