import { Router, Request, Response } from "express";
import { NotFoundDataError } from "../utils/error";
import { ArchivesService } from "services/archive/archivesService";
import { IArchiveService } from "services/archive/archivesInterface";

export class ArchivesController {
  private archiveService: ArchivesService;
  public router: Router;

  constructor(archivesServise: ArchivesService) {
    this.archiveService = archivesServise;
    this.router = Router();

    this.router.get("/archives", async (req: Request, res: Response) => {
      const result = await this.archiveService.findAll();

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });
  }
}
