import { Router, Request, Response } from "express";
import { NowstrService } from "services/nowstreaming/nowstrService";

export class NowstrController {
  private nowstrService: NowstrService;
  public router: Router;

  constructor(nowstrService: NowstrService) {
    this.nowstrService = nowstrService;
    this.router = Router();

    this.router.get("/nowstreamings", async (req: Request, res: Response) => {
      const offset = req.query.offset as string;
      console.log(offset);
      if (offset == null) {
        res.status(400).json("offset is undefined");
      }
      const result = await this.nowstrService.fetch(offset);

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });
  }
}
