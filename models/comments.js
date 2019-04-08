const connection = require("../db/connection");

exports.fetchComment = ({ comment_id }) => {
  return connection
    .select("*")
    .from("comments")
    .where({ comment_id });
};

exports.fetchArticleComments = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select("article_id", "comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, order);
};

exports.addCommentToArticle = (params, body) => {
  body.author = body.username;
  body.article_id = params.article_id;
  delete body.username;
  return connection("comments").insert(body, Object.keys(body));
};

exports.editComment = (params, body) => {
  const votes = { votes: 0 };
  if (body.inc_votes) {
    votes.votes = body.inc_votes;
    delete body.inc_votes;
  }
  return connection("comments")
    .where("comment_id", "=", params.comment_id)
    .update(body, Object.keys(body))
    .increment(votes)
    .returning("*");
};

exports.deleteComment = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del();
};
