exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', table => {
		table.increments('post_id'); //primary key
		table
			.string('project_id') // project's primary key
			.notNullable()
			.references('project.project_id');
		table.string('picture'); // image url
		table.string('text', 1024); // text field; decide on a reasonable max length
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('posts');
};
