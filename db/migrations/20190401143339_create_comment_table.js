exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable
      .increments("comment_id")
      .primary()
      .notNullable();
    commentsTable
      .string("author")
      .notNullable()
      .references("username")
      .inTable("users")
      .notNullable();
    commentsTable.text("body").notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles")
      .onDelete("cascade")
      .notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
