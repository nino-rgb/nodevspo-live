import { error } from "console";
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

      if (offset == null) {
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

    this.router.get("/archives/by-talent", async (req: Request, res: Response) => {
      console.log("✅ /archives に到達");
      const talentId = Number(req.query.talent_id);
      console.log("✅ talentId:", talentId); // ← ここが NaN なら必ず全件になる
      console.log("🎯 talent_id (from req.query):", req.query.talent_id);
      console.log("🧪 parsed talentId:", talentId);
      if (isNaN(talentId)) {
        res.status(400).json({ error: "Invalid talent_id" });
        return;
      }
      const result = await this.archiveService.fetchByTalentId(talentId);
      if (result instanceof Error) {
        console.error("検索エラー:", result.message);
        res.status(500).json({ error: result.message });
        return;
      }
      res.status(200).json(result);
    });
  }
}
