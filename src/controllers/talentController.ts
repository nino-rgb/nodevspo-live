import { Router, Request, Response } from "express";
import { TalentService } from "../services/talent/talentsService";
import { NotFoundDataError } from "../utils/error";

export class TalentsController {
  private talentsService: TalentService;
  public router: Router;

  constructor(talentsService: TalentService) {
    this.talentsService = talentsService;
    this.router = Router();

    this.router.get("/talents", async (req: Request, res: Response) => {
      const result = await this.talentsService.findAll();

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });

    this.router.get("/talents/search", async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;

      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        res.status(400).json({ error: "Missing or invalid 'keyword' parameter" });
        return;
      }

      const result = await this.talentsService.search(keyword.toString());

      if (result instanceof Error) {
        console.error("検索エラー:", result.message);
        res.status(500).json({ error: result.message });
        return;
      }
      res.status(200).json(result);
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
