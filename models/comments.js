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
