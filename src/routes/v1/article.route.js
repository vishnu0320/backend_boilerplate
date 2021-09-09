const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const articleValidation = require('../../validations/article.validation');
const articleController = require('../../controllers/article.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
const upload = multer({ dest: './public/uploads', limits: { fileSize: 5242880 } });

router
  .route('/')
  .post(
    auth('getArticles'),
    upload.single('image'),
    validate(articleValidation.createArticle),
    articleController.createArticle
  )
  .get(auth('getArticles'), validate(articleValidation.getArticles), articleController.getArticles);

router
  .route('/:articleId')
  .get(auth('getArticles'), validate(articleValidation.getArticle), articleController.getArticle)
  .patch(
    auth('getArticles'),
    upload.single('image'),
    validate(articleValidation.updateArticle),
    articleController.updateArticle
  )
  .delete(auth('manageArticles'), validate(articleValidation.deleteArticle), articleController.deleteArticle);

module.exports = router;
