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

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
