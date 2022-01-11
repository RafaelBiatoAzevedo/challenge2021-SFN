import { TArticle } from '../types/TArticle';
import { TPagination } from '../types/TPagination';
const connection = require('./connectionMongoDb');
const { getArticlesAll } = require('./articlesModels');
const apiSFN = require('../axios/createAxios');

const fetchAllArticles = async (): Promise<TArticle[]> => {
  const { data: articlesCount } = await apiSFN.get('/articles/count');

  const { data: articles } = await apiSFN.get('/articles', {
    params: { _limit: articlesCount },
  });

  return articles;
};

const loadingData = async () => {
  const pagination: TPagination = { page: 1, limit: 1 };
  const { data: articlesInDb } = await getArticlesAll(pagination);

  if (articlesInDb.length === 0) {
    console.log('DATABASE LOADING...');

    const fechedArticles = await fetchAllArticles();
    const articles = fechedArticles.map((article) => {
      const { id, ...articleData } = article;
      return articleData;
    });

    await connection().then((db: any) =>
      db.collection('articles').insertMany(articles)
    );

    console.log('OK DATABASE LOADED');
  }
};

module.exports = loadingData;
