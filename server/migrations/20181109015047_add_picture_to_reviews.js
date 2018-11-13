exports.up = function(knex, Promise) {
	return knex.schema.table('reviews', function(table) {
		table.string('picture');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('reviews', function(table) {
		table.dropColumn('picture');
	});
};
