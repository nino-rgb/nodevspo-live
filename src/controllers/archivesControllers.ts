import { Router, Request, Response } from "express";
import { ArchiveService } from "services/archive/archivesService";

export class ArchivesController {
  private archiveService: ArchiveService;
  public router: Router;

  constructor(archivesServise: ArchiveService) {
    this.archiveService = archivesServise;
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
  }
}
