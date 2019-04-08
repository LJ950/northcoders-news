exports.badRequest = (err, req, res, next) => {
  const badRequestCodes = ["22P02"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.routeNotFound = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not Found" });
  } else next(err);
};

exports.unprocessableEntity = (err, req, res, next) => {
  const unprocCodes = ["23505"];
  if (err.status === 422 || unprocCodes.includes(err.code)) {
    res.status(422).send({ msg: "Not Updated" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
