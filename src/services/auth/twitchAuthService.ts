// src/services/auth/twitchAuthService.ts
import { fetchTwitchAppToken } from "../../repositories/outerAPI/twitchAPI";

type CachedToken = { token: string; expiresAt: number };

export class TwitchAuthService {
  private cache: CachedToken | null = null;
  private refreshing: Promise<string> | null = null;

  constructor(
    private clientId = process.env.TWITCH_CLIENT_ID as string,
    private clientSecret = process.env.TWITCH_CLIENT_SECRET as string,
  ) {
    if (!this.clientId || !this.clientSecret) {
      throw new Error("Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET");
    }
  }

  public async getAppAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.cache && this.cache.expiresAt > now) return this.cache.token;
    if (this.refreshing) return this.refreshing;
    this.refreshing = this.refreshToken();
    try {
      return await this.refreshing;
    } finally {
      this.refreshing = null;
    }
  }

  private async refreshToken(): Promise<string> {
    const res = await fetchTwitchAppToken(this.clientId, this.clientSecret);
    const bufferMs = 5 * 60 * 1000;
    const expiresAt = Date.now() + res.expires_in * 1000 - bufferMs;
    this.cache = { token: res.access_token, expiresAt };
    return res.access_token;
  }

  public async withTwitchAuthRetry<T>(fn: (token: string) => Promise<T>): Promise<T> {
    const token = await this.getAppAccessToken();
    try {
      return await fn(token);
    } catch (e: any) {
      if (e?.response?.status === 401) {
        await this.refreshToken();
        const token2 = await this.getAppAccessToken();
        return await fn(token2);
      }
      throw e;
    }
  }
}
