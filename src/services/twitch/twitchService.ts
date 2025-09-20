// src/services/twitch/twitchService.ts
import axios, { AxiosInstance } from "axios";
import { TwitchAuthService } from "../auth/twitchAuthService";

const twitchApi: AxiosInstance = axios.create({
  baseURL: "https://api.twitch.tv",
  timeout: 10000,
});

type TwitchUser = { id: string; login: string; display_name: string; profile_image_url?: string };
type TwitchStream = {
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  game_name: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
};

export class TwitchService {
  constructor(private auth: TwitchAuthService) {}

  private chunk<T>(arr: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  // login配列 → users（最大100/回）
  public async getUsersByLogins(logins: string[]): Promise<TwitchUser[]> {
    const token = await this.auth.getAppAccessToken();
    const chunks = this.chunk(logins, 100);
    const all: TwitchUser[] = [];
    for (const part of chunks) {
      const params = new URLSearchParams();
      part.forEach((l) => params.append("login", l));
      const { data } = await twitchApi.get<{ data: TwitchUser[] }>("/helix/users", {
        params,
        headers: { "Client-Id": process.env.TWITCH_CLIENT_ID as string, Authorization: `Bearer ${token}` },
      });
      all.push(...data.data);
    }
    return all;
  }

  // user_id配列 → streams（最大100/回・配信中のみ返る）
  public async getStreamsByUserIds(userIds: string[]): Promise<TwitchStream[]> {
    return this.auth.withTwitchAuthRetry(async (token) => {
      const chunks = this.chunk(userIds, 100);
      const all: TwitchStream[] = [];
      for (const part of chunks) {
        const params = new URLSearchParams();
        part.forEach((id) => params.append("user_id", id));
        const { data } = await twitchApi.get<{ data: TwitchStream[] }>("/helix/streams", {
          params,
          headers: { "Client-Id": process.env.TWITCH_CLIENT_ID as string, Authorization: `Bearer ${token}` },
        });
        all.push(...data.data);
      }
      return all;
    });
  }
}
