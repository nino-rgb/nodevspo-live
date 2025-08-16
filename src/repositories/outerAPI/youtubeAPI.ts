import axios from "axios";
import { FetchedVideo } from "models/live";
import dotenv from "dotenv";
dotenv.config();

export async function FetchVideosByYoutube(): Promise<FetchedVideo[] | Error> {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        q: "ぶいすぽ",
        eventType: "live",
        order: "date",
        type: "video",
        maxResults: 50,
      },
    });
    const items = response.data.items.filter((item: any) => item.id && item.id.videoId); //チャンネルIDでフィルター
    console.log("YouTube API 取得件数:", items.length);

    const videos: FetchedVideo[] = items.map((items: any) => ({
      videoId: items.id.videoId,
      channelId: items.snippet.channelId,
      title: items.snippet.title,
      thumbnail: items.snippet.thumbnails.default.url,
      publishedAt: items.snippet.publishedAt,
    })); //FetchVideo型に変形

    return videos;
  } catch (error) {
    return new Error(`YouTube API fetch failed: ${error}`);
  }
}
