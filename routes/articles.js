const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleByID } = require("../controllers/articles");
const { methodNotAllowed } = require("../errors/index");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .all(methodNotAllowed);

module.exports = { articlesRouter };
