export type Talent = {
  id?: number;
  name: string;
  youtube_profile: string;
  official_profile: string;
  createdAt?: Date;
  updetaedAt?: Date;
};

export type Archive = {
  id?: number;
  outer_link: string;
  talents_id: number;
  video_title: string;
  video_thumbnail: string;
  open_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Nowstreaming = {
  id?: number;
  outer_link: string;
  talents_id: number;
  video_title: string;
  video_thumbnail: string;
  open_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
