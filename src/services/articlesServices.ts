import moment from 'moment';
import { TArticle } from '../types/TArticle';
import { TPagination } from '../types/TPagination';

const Joi = require('joi');

const {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesAll,
  getArticleById,
} = require('../models/articlesModels');

const schema = Joi.object({
  _id: Joi.string(),
  featured: Joi.boolean(),
  title: Joi.string().required(),
  url: Joi.string(),
  imageUrl: Joi.string(),
  newsSite: Joi.string(),
  sumary: Joi.string().required(),
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
    featured: articleBodySchema.featured || false,
    publishedAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    updatedAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    launches: articleBodySchema.launches || [],
    events: articleBodySchema.events || [],
  };

  const result = await createArticle(article);

  if (!result) throw Error('No created article');

  return result;
};

const updateArticleService = async (
  articleId: string,
  articleBodySchema: TArticle
) => {
  const { error } = schema.validate(articleBodySchema);

  if (error) throw Error('Invalid body schema. Correct and try again.');

  const article: TArticle = {
    ...articleBodySchema,
    updatedAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  };

  const result = await updateArticle(articleId, article);

  if (!result) throw Error('No found article');

  return result;
};

const deleteArticleService = async (articleId: string) => {
  const result = await deleteArticle(articleId);

  if (!result) throw Error('No found article');

  return { message: 'Article deleted' };
};

const getArticlesAllService = async (queryPagination: TPagination) => {
  const pagination: TPagination = {
    page: Number(queryPagination.page) || 1,
    limit: Number(queryPagination.limit) || 20,
  };

  const result = await getArticlesAll(pagination);

  return {
    page: pagination.page,
    limit: pagination.limit,
    ...result,
  };
};

const getArticleByIdService = async (articleId: string) => {
  const result = await getArticleById(articleId);

  if (!result) throw Error('No found article');

  return result;
};

module.exports = {
  createArticleService,
  updateArticleService,
  deleteArticleService,
  getArticlesAllService,
  getArticleByIdService,
};
