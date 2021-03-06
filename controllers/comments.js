const {
  fetchComment,
  fetchArticleComments,
  addCommentToArticle,
  editComment,
  deleteComment
} = require("../models/comments");

exports.getCommentByID = (req, res, next) => {
  fetchComment(req.params)
    .then(([comment]) => {
      if (comment) res.status(200).json({ comment });
      else return Promise.reject({ status: 404 });
    })
    .catch(next);
};

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
  addCommentToArticle(req.params, req.body)
    .then(([comment]) => {
      res.status(201).json({ comment });
    })
    .catch(next);
};

exports.updateCommentByID = (req, res, next) => {
  editComment(req.params, req.body)
    .then(comment => {
      if (comment.length) res.status(200).json({ comment });
      else return Promise.reject({ status: 404 });
    })
    .catch(next);
};

exports.deleteCommentByID = (req, res, next) => {
  deleteComment(req.params)
    .then(sqlRes => {
      if (sqlRes) res.status(204).send({ msg: "deleted" });
      else return Promise.reject({ status: 404 });
    })
    .catch(next);
};
