const { fetchArticles } = require("../models/articles");

exports.getArticles = (req, res, next) => {
  fetchArticles(req.params).then(articles => {
    res.status(200).json({ articles });
  });
};

exports.getArticleByID = (req, res, next) => {
  fetchArticles(req.params)
    .then(([articles]) => {
      if (articles) {
        res.status(200).json({ articles });
      } else {
        return Promise.reject({ status: 404 });
      }
    })
    .catch(next);
};
