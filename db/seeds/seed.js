const { topicData, userData, articleData, commentData } = require("../data");
const {
  formatArticleData,
  formatCommentData,
  indexArticleTitle
} = require("../../utils/seed-data-funcs");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("topics")
        .insert(topicData)
        .returning("*")
    )
    .then(() =>
      knex("users")
        .insert(userData)
        .returning("*")
    )
    .then(() => {
      const formattedArticleData = formatArticleData(articleData);
      return knex("articles")
        .insert(formattedArticleData)
        .returning("*");
    })
    .then(articles => {
      const formattedCommentData = formatCommentData(
        commentData,
        indexArticleTitle(articles)
      );
      return knex("comments")
        .insert(formattedCommentData)
        .returning("*");
    });
};
