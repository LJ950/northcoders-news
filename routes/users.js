const express = require("express");
const usersRouter = express.Router();
const { methodNotAllowed } = require("../errors/index");

const { getUsers, getUserByID } = require("../controllers/users");

usersRouter
  .route("/")
  .get(getUsers)
  .all(methodNotAllowed);
usersRouter
  .route("/:username")
  .get(getUserByID)
  .all(methodNotAllowed);

module.exports = { usersRouter };
