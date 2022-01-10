import { TArticle } from '../types/TArticle';
import { TPagination } from '../types/TPagination';
const connection = require('./connectionMongoDb');
const moment = require('moment');
const { getArticlesAll } = require('./articlesModels');
const apiSFN = require('../../axios/createAxios');

const yesterday = moment()
  .subtract(1, 'days')
  .hours(9)
  .minutes(0)
  .seconds(0)
  .format('YYYY-MM-DDTHH:mm:ss');

const fechedArticlesYesterday = async (): Promise<TArticle[]> => {
  const { data: articles } = await apiSFN('/articles', {
    params: { publishedAt_gte: yesterday },
  });

  return articles;
};

const getArticlesYesterday = async (): Promise<TArticle[]> => {
  const articles = await connection().then((db: any) =>
    db
      .collection('articles')
      .find({ publishedAt: { $gte: yesterday } })
      .toArray()
  );

  return articles;
};

const updateArticlesDaily = async () => {
  const articlesFechedYesterday = await fechedArticlesYesterday();
  const articlesYesterday = await getArticlesYesterday();

  const articlesForInsert: TArticle[] = articlesFechedYesterday.reduce(
    (arrayArticles: TArticle[], nextArticle: TArticle) => {
      if (
        !articlesYesterday.some(
          (article: TArticle) => article.title === nextArticle.title
        )
      ) {
        arrayArticles.push(nextArticle);
        return arrayArticles;
      }
      return arrayArticles;
    },
    []
  );

  await connection().then((db: any) =>
    db.collection('articles').insertMany(articlesForInsert)
  );

  console.log('UPDATE DAILY 9:00 DONE');
};

module.exports = updateArticlesDaily;
