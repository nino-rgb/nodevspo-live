import axios, { AxiosInstance } from "axios";

export type TwitchTokenResponse = {
  access_token: string;
  expires_in: number; // seconds
  token_type: "bearer";
};

const twitchId = axios.create({ baseURL: "https://id.twitch.tv", timeout: 10000 });
const twitchApi: AxiosInstance = axios.create({ baseURL: "https://api.twitch.tv", timeout: 10000 });

// Client Credentials Flow でアプリ用トークン発行
export async function fetchTwitchAppToken(clientId: string, clientSercret: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSercret,
    grant_type: "client_credentials",
  });
  const { data } = await twitchId.post<TwitchTokenResponse>("/oauth2/token", params);
  return data;
}

// users: login を一括解決(100/)ー 必要に応じて使う
export async function getUsersByLogins(token: string, clientId: string, logins: string[]) {
  const params = new URLSearchParams();
  logins.forEach((l) => params.append("login", l));
  const { data } = await twitchApi.get("/helix/users", {
    params,
    headers: { "Client-Id": clientId, Authorization: `Bearer ${token}` },
  });
  return data; // { data: TwitchUser[] }
}

//streams: user_id を一括チェック(100/回を配信中のみ返る)
export async function getStreamsByUserIds(token: string, clientId: string, userIds: string[]) {
  const params = new URLSearchParams();
  userIds.forEach((id) => params.append("user_id", id));
  const { data } = await twitchApi.get("/helix/streams", {
    params,
    headers: { "Client-Id": clientId, Authorization: `Bearer ${token}` },
  });
  return data;
}
