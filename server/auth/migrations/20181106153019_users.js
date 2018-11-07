
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments();

        tbl.string('userID').notNullable().unique();
        tbl.string('nickname').notNullable().unique();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
