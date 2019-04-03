const connection = require("../db/connection");

exports.fetchArticles = ({ article_id }) => {
  return connection
    .select([
      "articles.article_id",
      "articles.author",
      "articles.title",
      "articles.body",
      "topic",
      "articles.created_at",
      "articles.votes"
    ])
    .from("articles")
    .leftJoin("comments", "comments.comment_id", "=", "articles.article_id")
    .count("comments.comment_id as comment_count")
    .groupBy("articles.article_id")
    .where(builder => {
      if (article_id) builder.where("articles.article_id", "=", article_id);
    });
};
