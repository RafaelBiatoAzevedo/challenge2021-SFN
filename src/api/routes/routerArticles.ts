import express from 'express';

const rescue = require('express-rescue');
const routerArticles = express.Router();
const { articlesErrors } = require('../../middlewares/errors');

const {
  createArticleController,
  updateArticleController,
  deleteArticleController,
  getArticlesAllController,
  getArticleByIdController,
} = require('../../controllers/articlesControllers');

routerArticles.get(
  '/',
  rescue((req: any, res: any) => getArticlesAllController(req, res))
);

routerArticles.get(
  '/:id',
  rescue((req: any, res: any) => getArticleByIdController(req, res))
);

routerArticles.post(
  '/',
  rescue((req: any, res: any) => createArticleController(req, res))
);

routerArticles.put(
  '/:id',
  rescue((req: any, res: any) => updateArticleController(req, res))
);

routerArticles.delete(
  '/:id',
  rescue((req: any, res: any) => deleteArticleController(req, res))
);

routerArticles.use(articlesErrors);

module.exports = routerArticles;
