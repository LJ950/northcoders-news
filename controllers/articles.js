const {
  fetchArticles,
  updateArticle,
  deleteArticle
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
  fetchArticles(req.params, req.query)
    .then(articles => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

exports.getArticleByID = (req, res, next) => {
  fetchArticles(req.params, req.query)
    .then(([article]) => {
      if (article) {
        res.status(200).json({ article });
      } else {
        return Promise.reject({ status: 404 });
      }
    })
    .catch(next);
};

exports.updateArticleByID = (req, res, next) => {
  updateArticle(req.params, req.body)
    .then(([articles]) => {
      if (articles) {
        res.status(200).json({ articles });
      } else {
        return Promise.reject({ status: 422 });
      }
    })
    .catch(next);
};

exports.deleteArticleByID = (req, res, next) => {
  deleteArticle(req.params)
    .then(() => {
      res.status(204).send({ msg: "deleted" });
    })
    .catch(next);
};
