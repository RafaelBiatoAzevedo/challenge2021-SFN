import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

const app = express();
const { responseError } = require('../middlewares/errors');
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_req, res) =>
  res
    .status(200)
    .json({ message: 'Back-end Challenge 2021 🏅 - Space Flight News' })
);

app.use('/articles', routes.routerArticles);

app.use(responseError);

module.exports = app;
