const express = require("express");
const apiRouter = require("./routes/api");
const cors = require("cors");
const {
  badRequest,
  routeNotFound,
  unprocessableEntity,
  handle500
} = require("./errors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(badRequest);

app.use(routeNotFound);

app.use(unprocessableEntity);

app.use(handle500);

module.exports = app;
