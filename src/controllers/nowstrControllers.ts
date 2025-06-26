import { error } from "console";
import { Router, Request, Response } from "express";
import { NowstrService } from "services/nowstreaming/nowstrService";

export class NowstrController {
  private nowstrService: NowstrService;
  public router: Router;

  constructor(nowstrService: NowstrService) {
    this.nowstrService = nowstrService;
    this.router = Router();

    this.router.get("/nowstreamings", async (req: Request, res: Response) => {
      const offsetParam = req.query.offset;
      const offset = offsetParam ? parseInt(offsetParam as string, 10) : 0;
      if (offset == null) {
        res.status(400).json("Invalid offset parameter");
        return;
      }
      const result = await this.nowstrService.fetch(offset);

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });

    this.router.get("/nowstreamings/search", async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;

      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        res.status(400).json({ error: "Missing or invalid 'keyword' parameter" });
        return;
      }
      const result = await this.nowstrService.search(keyword.toString());

      if (result instanceof Error) {
        console.error("研削エラー:", result.message);
        res.status(500).json({ error: result.message });
        return;
      }
    });
  }
}
