// Update with your config settings.
const dbConnection = process.env.DATABASE_URL;

module.exports = {
	auth: {
		client: 'sqlite3',
    	connection: {
      		filename: './auth/db.sqlite3'
    	},
    	useNullAsDefault: true,
    	migrations: {
      		directory: './auth/migrations'
    	},
    	seeds: {
      		directory: './auth/seeds'
    	}
	},
	development: {
		client: 'mssql',
		connection: {},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	production: {
		client: 'mssql',
		connection: dbConnection,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	}
};
