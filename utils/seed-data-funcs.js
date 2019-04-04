exports.formatArticleData = function(articleData) {
  const newData = [];
  articleData.forEach(function(article) {
    article.created_at = new Date(article.created_at);
    newData.push(article);
  });
  return newData;
};

// outputs {title: article_id, title2 : article_2}
exports.indexArticleTitle = function(articleData) {
  let titlesID = {};
  articleData.forEach(function(article, index) {
    titlesID[article.title] = article.article_id;
  });
  return titlesID;
};

//adds article_id, changes timestamp on commentData
exports.formatCommentData = function(commentData, articlesID) {
  const newData = commentData.map(function(comment) {
    const newComment = { ...comment };
    newComment.article_id = articlesID[newComment.belongs_to];
    delete newComment.belongs_to;
    newComment.created_at = new Date(newComment.created_at);
    newComment.author = newComment.created_by;
    delete newComment.created_by;
    return newComment;
  });
  return newData;
};
