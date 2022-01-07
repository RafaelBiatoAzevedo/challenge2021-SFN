import express from 'express';
const rescue = require('express-rescue');

const {} = require('../articlesControllers');

const routerArticles = express.Router();

routerArticles.get(
  '/',
  rescue((req: any, res: any) => {})
);

routerArticles.get(
  '/articles/:id',
  rescue((req: any, res: any) => {})
);

routerArticles.post(
  '/articles',
  rescue((req: any, res: any) => {})
);

routerArticles.put(
  '/articles/:id',
  rescue((req: any, res: any) => {})
);

routerArticles.delete(
  '/articles/:id',
  rescue((req: any, res: any) => {})
);

module.exports = routerArticles;
