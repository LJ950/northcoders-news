const { fetchUsers } = require("../models/users");

exports.getUsers = (req, res, next) => {
  fetchUsers(req.params).then(users => {
    res.status(200).json({ users });
  });
};

exports.getUserByID = (req, res, next) => {
  fetchUsers(req.params)
    .then(([user]) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        return Promise.reject({ status: 404 });
      }
    })
    .catch(next);
};
