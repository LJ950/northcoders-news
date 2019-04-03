const express = require("express");
const apiRouter = require("./routes/api");
const {
  badRequest,
  routeNotFound,
  methodNotAllowed,
  handle500
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(badRequest);

app.use(routeNotFound);

app.use(methodNotAllowed);

app.use(handle500);

module.exports = app;
