export type TPatternValue = {
  id: string;
  provider: string;
};

export type TArticle = {
  _id?: string;
  id?: string;
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
