// src/controllers/twitchControllers.ts
import { Router, Request, Response } from "express";
import { createDBConnection } from "../utils/database"; // パスはあなたの環境に合わせて
import { TalentRepository } from "../repositories/database/talent/talentRepository";
import { TwitchAuthService } from "../services/auth/twitchAuthService";
import { TwitchService } from "../services/twitch/twitchService";
import { TwitchMemberService } from "../services/twitch/twitchMemberService";

export class TwitchController {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/twitch/vspo/live-db", async (_req: Request, res: Response) => {
      const conn = await createDBConnection();
      try {
        const talentRepo = new TalentRepository(conn);
        const auth = new TwitchAuthService();
        const twitchService = new TwitchService(auth);
        const memberService = new TwitchMemberService(talentRepo, twitchService);
        const result = await memberService.getLiveStatusForAll();
        res.status(200).json(result);
      } catch (e: any) {
        res.status(500).json({ error: e?.message || "Twitch API/DB error" });
      } finally {
        await conn.end();
      }
    });
  }
}
