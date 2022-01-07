const {
  createArticleService,
  updateArticleService,
  deleteArticleService,
  getArticlesAllService,
  getArticleByIdService,
} = require('../services/articlesServices');

const createArticleController = async (req: any, res: any) => {
  const { body } = req;

  const result = await createArticleService(body);

  res.status(201).json(result);
};

const updateArticleController = async (req: any, res: any) => {
  const { id } = req.params;
  const { body } = req;

  const result = await updateArticleService(id, body);

  res.status(200).json(result);
};

const deleteArticleController = async (req: any, res: any) => {
  const { id } = req.params;

  const result = await deleteArticleService(id);

  res.status(200).json(result);
};

const getArticlesAllController = async (req: any, res: any) => {
  const result = await getArticlesAllService();

  res.status(200).json(result);
};

const getArticleByIdController = async (req: any, res: any) => {
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
