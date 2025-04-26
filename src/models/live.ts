export type Talents = {
  id?: number;
  name: string;
  youtube_profile: string;
  official_profile: string;
  createdAt?: Date;
  updetaedAt?: Date;
};

export type Archives = {
  id?: number;
  outer_link: string;
  talents_id: string;
  video_title: string;
  video_thumbnail: string;
  open_date: Date;
  createdAt?: Date;
  updetaedAt?: Date;
};
