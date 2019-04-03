const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleByID } = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticleByID);

module.exports = { articlesRouter };
