const connection = require("../db/connection");

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

exports.addCommentToArticle = ({ params, body }) => {
  body.author = body.username;
  body.article_id = params.article_id;
  delete body.username;
  return connection("comments").insert(body, Object.keys(body));
};
