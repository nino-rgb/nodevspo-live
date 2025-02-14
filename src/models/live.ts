export type Talents = {
  id?: number;
  name: string;
  youtube_profile: string;
  official_profile: string;
  createdAt?: Date;
  updetaedAtt?: Date;
};

export type Games = {
  id?: number;
  title: string;
  createdAt?: Date;
  updetaedAtt?: Date;
};

export type Talents_Games = {
  id?: number;
  talents_id: number;
  games_id: number;
  createdAt?: Date;
  updetaedAtt?: Date;
};
