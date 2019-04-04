const express = require("express");
const articlesRouter = express.Router();
const commentsRouter = express.Router();
const {
  getArticles,
  getArticleByID,
  updateArticleByID,
  deleteArticleByID
} = require("../controllers/articles");
const { createComment } = require("../controllers/comments");
const { getCommentsByArticle } = require("../controllers/comments");
const { methodNotAllowed } = require("../errors/index");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(updateArticleByID)
  .delete(deleteArticleByID)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(createComment)
  .all(methodNotAllowed);

module.exports = { articlesRouter, commentsRouter };
