import express from 'express';
const {
  createArticleService,
  updateArticleService,
  deleteArticleService,
  getArticlesAllService,
  getArticleByIdService,
} = require('../services/articlesServices');

const createArticleController = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;

  const result = await createArticleService(body);

  res.status(201).json(result);
};

const updateArticleController = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { body } = req;

  const result = await updateArticleService(id, body);

  res.status(200).json(result);
};

const deleteArticleController = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const result = await deleteArticleService(id);

  res.status(200).json(result);
};

const getArticlesAllController = async (
  req: express.Request,
  res: express.Response
) => {
  const { query } = req;
  const result = await getArticlesAllService(query);

  res.status(200).json(result);
};

const getArticleByIdController = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const result = await getArticleByIdService(id);

  res.status(200).json(result);
};

module.exports = {
  createArticleController,
  updateArticleController,
  deleteArticleController,
  getArticlesAllController,
  getArticleByIdController,
};
