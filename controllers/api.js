exports.endpoints = (req, res, next) => {
  res.status(200).json({
    endpoints: {
      topics: { requests: ["GET"] },
      users: { requests: ["GET"], username: { requests: ["GET"] } },
      articles: {
        requests: ["GET"],
        article_id: {
          requests: ["GET", "PATCH", "DELETE"],
          comments: { requests: ["GET", "POST"] }
        }
      },
      comments: { comment_id: { requests: ["GET", "PATCH", "DELETE"] } }
    }
  });
};
