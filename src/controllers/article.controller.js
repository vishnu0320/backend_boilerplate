const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleService } = require('../services');

const createArticle = catchAsync(async (req, res) => {
  const articleBody = {
    ...req.body,
    file: req.file && req.file.filename,
  };
  const article = await articleService.createArticle(articleBody);
  res.status(httpStatus.CREATED).send(article);
});

const getArticles = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await articleService.queryArticles(filter, options);
  res.send(result);
});

const getArticle = catchAsync(async (req, res) => {
  const article = await articleService.getArticleById(req.params.articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  res.send(article);
});

const updateArticle = catchAsync(async (req, res) => {
  const articleBody = {
    ...req.body,
    file: req.file && req.file.filename,
  };
  const article = await articleService.updateArticleById(req.params.articleId, articleBody);
  res.send(article);
});

const deleteArticle = catchAsync(async (req, res) => {
  await articleService.deleteArticleById(req.params.articleId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
