import { TArticle } from '../types/TArticle';

const {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesAll,
  getArticleById,
} = require('../models/articlesModels');

const Joi = require('joi');

const schema = Joi.object({
  _id: Joi.string(),
  id: Joi.string(),
  featured: Joi.boolean(),
  title: Joi.string(),
  url: Joi.string(),
  imageUrl: Joi.string(),
  newsSite: Joi.string(),
  sumary: Joi.string(),
  publishedAt: Joi.date(),
  updatedAt: Joi.date(),
  launches: Joi.array(),
  events: Joi.array(),
});

const createArticleService = async (articleBodySchema: TArticle) => {
  const { error } = schema.validate(articleBodySchema);

  if (error) throw Error('Invalid body schema. Correct and try again.');

  const article: TArticle = {
    ...articleBodySchema,
    publishedAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await createArticle(article);

  if (!result) throw Error('No created article');

  return result;
};

const updateArticleService = async (articleBodySchema: TArticle) => {
  const { error } = schema.validate(articleBodySchema);

  if (error) throw Error('Invalid body schema. Correct and try again.');

  const result = await updateArticle(articleBodySchema);

  if (!result) throw Error('No updated article');

  return result;
};

const deleteArticleService = async (articleId: string) => {
  const result = await deleteArticle(articleId);

  if (!result) throw Error('No delete article');

  return result;
};

const getArticlesAllService = async () => {
  const result = await getArticlesAll();

  return result;
};

const getArticleByIdService = async (articleId: string) => {
  const result = await getArticleById(articleId);

  if (!result) throw Error('No found article');

  return result;
};
