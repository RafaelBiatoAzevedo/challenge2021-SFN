import { TArticle } from '../types/TArticle';
import { TPagination } from '../types/TPagination';
const connection = require('./connectionMongoDb');
const { getArticlesAll } = require('./articlesModels');
const axios = require('axios').default;

const fetchAllArticles = async (): Promise<TArticle[]> => {
  const { data: articlesCount } = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles/count'
  );

  const { data: articles } = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles',
    { params: { _limit: articlesCount } }
  );

  return articles;
};

const loadingData = async () => {
  const pagination: TPagination = { page: 1, limit: 1 };
  const { data: articlesInDb } = await getArticlesAll(pagination);

  if (articlesInDb.length === 0) {
    const articles = await fetchAllArticles();

    await connection().then((db: any) =>
      db.collection('articles').insertMany(articles)
    );
  }
};

module.exports = { loadingData };
