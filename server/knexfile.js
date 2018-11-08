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
		connection: {
			host: 'localhost\\SQLEXPRESS',
			user: 'sa',
			password: 'admin',
			database: 'diydb',
			options: {
				port: 1433,
				encrypt: true
			}
		},
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
