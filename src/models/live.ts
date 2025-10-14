export type Talent = {
  id: number;
  name: string;
  youtube_profile: string;
  official_profile: string;
  youtube_channel_id: string;
  twitch_channel_id: string;
  createdAt?: Date;
  updetaedAt?: Date;
};

export type Archive = {
  id?: number;
  outer_link: string;
  talent_id: number;
  video_title: string;
  video_thumbnail: string;
  open_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Nowstreaming = {
  id?: number;
  outer_link: string;
  talent_id: number;
  video_title: string;
  video_thumbnail: string;
  open_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FetchedVideo = {
  videoId: string;
  channelId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

export type TalentTwitchRow = {
  id: number;
  name?: string; // カラムがある場合だけ
  twitch_login: string | null;
  twitch_user_id: string | null;
};
