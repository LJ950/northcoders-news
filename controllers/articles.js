const {
  fetchArticles,
  updateArticle,
  deleteArticle
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
  fetchArticles(req.params, req.query).then(articles => {
    res.status(200).json({ articles });
  });
};

exports.getArticleByID = (req, res, next) => {
  fetchArticles(req.params, req.query)
    .then(([articles]) => {
      if (articles) {
        res.status(200).json({ articles });
      } else {
        return Promise.reject({ status: 404 });
      }
    })
    .catch(next);
};

exports.updateArticleByID = (req, res, next) => {
  updateArticle(req)
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
  deleteArticle(req.params).then(() => {
    res.status(204).send({ msg: "deleted" });
  });
};
