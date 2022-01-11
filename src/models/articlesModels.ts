import { TArticle } from '../types/TArticle';
import { TPagination } from '../types/TPagination';
const connection = require('./connectionMongoDb');

const { ObjectId } = require('mongodb');

const getArticleById = async (articleId: string) => {
  if (!ObjectId.isValid(articleId)) return null;

  const result = await connection().then((db: any) =>
    db.collection('articles').findOne({ _id: new ObjectId(articleId) })
  );

  return result;
};

const createArticle = async (articleData: TArticle) => {
  const result = await connection().then((db: any) =>
    db.collection('articles').insertOne(articleData)
  );

  if (result.acknowledged) {
    const articleInserted = await getArticleById(result.insertedId);
    return articleInserted;
  }

  return null;
};

const updateArticle = async (articleId: string, articleData: TArticle) => {
  if (!ObjectId.isValid(articleId)) return null;

  const result = await connection().then((db: any) =>
    db
      .collection('articles')
      .updateOne(
        { _id: new ObjectId(articleId) },
        { $set: { ...articleData, _id: new ObjectId(articleId) } }
      )
  );

  if (result.acknowledged) {
    const articleUpdated = await getArticleById(articleId);
    return articleUpdated;
  }

  return null;
};

const deleteArticle = async (articleId: string) => {
  if (!ObjectId.isValid(articleId)) return null;

  const result = await connection().then((db: any) =>
    db.collection('articles').deleteOne({ _id: new ObjectId(articleId) })
  );

  return result;
};

const getArticlesAll = async (pagination: TPagination) => {
  const pagesCount = Math.ceil(
    (await connection().then((db: any) =>
      db.collection('articles').find({}).count()
    )) / pagination.limit
  );

  const results = await connection().then((db: any) =>
    db
      .collection('articles')
      .find({})
      .limit(pagination.limit)
      .skip(pagination.page * pagination.limit)
      .toArray()
  );

  return { pagesCount, data: results };
};

module.exports = {
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesAll,
};
