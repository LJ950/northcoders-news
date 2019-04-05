const connection = require("../db/connection");

exports.fetchArticles = (
  { article_id },
  { author, topic, sort_by = "created_at", order = "desc" }
) => {
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
      if (author) builder.where("articles.author", "=", author);
      if (topic) builder.where("articles.topic", "=", topic);
    })
    .orderBy(sort_by, order);
};

exports.updateArticle = ({ params, body }) => {
  const votes = { votes: 0 };
  if (body.votes) {
    votes.votes = body.votes;
    delete body.votes;
  }
  return connection("articles")
    .where("article_id", "=", params.article_id)
    .update(body, Object.keys(body))
    .increment(votes)
    .returning("*");
};

exports.deleteArticle = ({ article_id }) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .del();
};
