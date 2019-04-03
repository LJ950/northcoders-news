exports.up = function(knex, Promise) {
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .string("slug")
      .primary()
      .unique();
    topicsTable.string("description");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("topics");
};
