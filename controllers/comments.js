const {
  fetchArticleComments,
  addCommentToArticle
} = require("../models/comments");

exports.getCommentsByArticle = (req, res, next) => {
  fetchArticleComments(req.params, req.query)
    .then(comments => {
      if (comments.length) {
        res.status(200).json({ comments });
      } else {
        return Promise.reject({ status: 404 });
      }
    })
    .catch(next);
};

exports.createComment = (req, res, next) => {
  addCommentToArticle(req)
    .then(comment => {
      res.status(201).json({ comment });
    })
    .catch(next);
};
