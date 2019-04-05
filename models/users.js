const connection = require("../db/connection");

exports.fetchUsers = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where(builder => {
      if (username) builder.where("users.username", "=", username);
    });
};
