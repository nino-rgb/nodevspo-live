import { Router, Request, Response } from "express";
import { ArchiveService } from "services/archive/archivesService";

export class ArchivesController {
  private archiveService: ArchiveService;
  public router: Router;

  constructor(archiveServise: ArchiveService) {
    this.archiveService = archiveServise;
    this.router = Router();

    this.router.get("/archives", async (req: Request, res: Response) => {
      const offsetParam = req.query.offset;
      const offset = offsetParam ? parseInt(offsetParam as string, 10) : 0;

      if (isNaN(offset)) {
        res.status(400).json("Invalid offset parameter");
        return;
      }
      const result = await this.archiveService.fetch(offset);

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });

    this.router.get("/archives/search", async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;

      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        res.status(400).json({ error: "Missing or invalid 'keyword' parameter" });
        return;
      }
      const result = await this.archiveService.search(keyword.toString());

      if (result instanceof Error) {
        console.error("検索エラー:", result.message);
        res.status(500).json({ error: result.message });
        return;
      }

      res.status(200).json(result);
    });
  }
}
