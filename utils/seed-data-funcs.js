exports.formatArticleData = function(articleData) {
  return articleData.map(function(article) {
    article.created_at = new Date(article.created_at);
    return article;
  });
};

// outputs {title: article_id, title2 : article_2}
exports.indexArticleTitle = function(articleData) {
  let titlesID = {};
  articleData.forEach(function(article, index) {
    titlesID[article.title] = index + 1;
  });
  return titlesID;
};

//adds article_id, changes timestamp on commentData
exports.formatCommentData = function(commentData, articlesID) {
  commentData.map(function(comment) {
    comment.article_id = articlesID[comment.belongs_to];
    comment.created_at = new Date(comment.created_at);
    delete comment.belongs_to;
  });
  return commentData;
};
