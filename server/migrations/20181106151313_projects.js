exports.up = function(knex, Promise) {
	return knex.schema.createTable('projects', table => {
		table.increments('project_id'); //primary key
		table
			.string('user_id') // author's primary key
			.notNullable()
			.references('users.user_id');
		table
			.string('project_name', 64) // project title
			.notNullable();
		table.string('picture'); // primary image url
		table.string('text', 560); // primary text field
		table
			.timestamp('last_updated') // time last updated
			.notNullable()
			.defaultTo(knex.fn.now());
		table.decimal('project_rating'); // average rating of project
		table.integer('rating_sum').unsigned(); // sum of all ratings received
		table.integer('rating_count').unsigned(); // count of all ratings received
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('projects');
};
