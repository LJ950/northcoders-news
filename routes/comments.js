const express = require("express");
const commentsRouter = express.Router();
const { methodNotAllowed } = require("../errors/index");

const {
  getCommentByID,
  updateCommentByID,
  deleteCommentByID
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .get(getCommentByID)
  .patch(updateCommentByID)
  .delete(deleteCommentByID)
  .all(methodNotAllowed);

module.exports = { commentsRouter };
