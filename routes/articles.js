const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticleByID,
  updateArticleByID,
  deleteArticleByID
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors/index");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(updateArticleByID)
  .delete(deleteArticleByID)
  .all(methodNotAllowed);

module.exports = { articlesRouter };
