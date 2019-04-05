const express = require("express");
const commentsRouter = express.Router();
const { methodNotAllowed } = require("../errors/index");

const {
  updateCommentByID,
  getCommentByID
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .get(getCommentByID)
  .patch(updateCommentByID)
  .all(methodNotAllowed);

module.exports = { commentsRouter };
