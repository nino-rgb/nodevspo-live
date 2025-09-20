// src/repositories/outerAPI/twitchAPI.ts
import axios from "axios";

export type TwitchTokenResponse = {
  access_token: string;
  expires_in: number; // seconds
  token_type: "bearer";
};

const twitchId = axios.create({ baseURL: "https://id.twitch.tv" });

export async function fetchTwitchAppToken(clientId: string, clientSecret: string): Promise<TwitchTokenResponse> {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });
  const { data } = await twitchId.post<TwitchTokenResponse>("/oauth2/token", params);
  return data;
}
