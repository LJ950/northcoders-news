exports.endpoints = (req, res, next) => {
  res
    .status(200)
    .json({
      endpoints: { topics: { requests: ["GET"] }, users: { requests: ["GET"] } }
    });
};
