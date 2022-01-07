import express from 'express';
import bodyParse from 'body-parser';
const cors = require('cors');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(bodyParse.json());

app.get('/', (_req, res) =>
  res
    .status(200)
    .json({ message: 'Back-end Challenge 2021 🏅 - Space Flight News' })
);

app.use('/articles', routes.routerArticles);

module.exports = app;
