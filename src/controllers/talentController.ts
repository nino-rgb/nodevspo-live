import { Router, Request, Response } from "express";
import { TalentsService } from "../services/talent/talentsService";
import { NotFoundDataError } from "../utils/error";

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

    this.router.get("/talents/:id", async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.talentsService.getById(id);

      if (result instanceof NotFoundDataError) {
        res.status(404).json(result.message);
        return;
      }

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(200).json(result);
    });
  }
}
