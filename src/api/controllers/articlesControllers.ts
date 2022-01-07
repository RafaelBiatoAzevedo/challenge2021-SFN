const {
  createArticleService,
  updateArticleService,
  deleteArticleService,
  getArticlesAllService,
  getArticleByIdService,
} = require('../services/articlesServices');

const createArticleController = async (req: any, _res: any) => {
  const { body } = req;

  const result = await createArticleService(body);

  return result;
};

const updateArticleController = async (req: any, _res: any) => {
  const { id } = req.params;
  const { body } = req;

  const result = await updateArticleService(id, body);

  return result;
};

const deleteArticleController = async (req: any, _res: any) => {
  const { id } = req.params;

  const result = await deleteArticleService(id);

  return result;
};

const getArticlesAllController = async (req: any, _res: any) => {
  const result = await getArticlesAllService();

  return result;
};

const getArticleByIdController = async (req: any, _res: any) => {
  const { id } = req.params;

  const result = await getArticleByIdService(id);

  return result;
};

module.exports = {
  createArticleController,
  updateArticleController,
  deleteArticleController,
  getArticlesAllController,
  getArticleByIdController,
};
