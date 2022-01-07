import express from 'express';
const rescue = require('express-rescue');

const {
  createArticleController,
  updateArticleController,
  deleteArticleController,
  getArticlesAllController,
  getArticleByIdController,
} = require('../articlesControllers');

const routerArticles = express.Router();

routerArticles.get(
  '/',
  rescue((req: any, res: any) => getArticlesAllController(req, res))
);

routerArticles.get(
  '/articles/:id',
  rescue((req: any, res: any) => getArticleByIdController(req, res))
);

routerArticles.post(
  '/articles',
  rescue((req: any, res: any) => createArticleController(req, res))
);

routerArticles.put(
  '/articles/:id',
  rescue((req: any, res: any) => updateArticleController(req, res))
);

routerArticles.delete(
  '/articles/:id',
  rescue((req: any, res: any) => deleteArticleController(req, res))
);

module.exports = routerArticles;
