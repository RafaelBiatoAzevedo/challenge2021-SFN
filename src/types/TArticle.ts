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
  newsSite: string;
  sumary: string;
  publishedAt: string;
  updatedAt: string;
  launches: TPatternValue[];
  events: TPatternValue[];
};
