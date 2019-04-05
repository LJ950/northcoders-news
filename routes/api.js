const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { topicsRouter } = require("./topics");
const { articlesRouter } = require("./articles");
const { commentsRouter } = require("./comments");
const { usersRouter } = require("./users");
const { endpoints } = require("../controllers/api");

apiRouter
  .route("/")
  .get(endpoints)
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
