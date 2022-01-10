export type TPatternValue = {
  id: string | number;
  provider: string;
};

export type TArticle = {
  _id?: string;
  id?: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newSite: string;
  sumary: string;
  publishedAt: Date;
  updatedAt: Date;
  launches: TPatternValue[];
  events: TPatternValue[];
};
