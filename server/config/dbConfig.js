const knex = require("knex");
const knexConfig = require("../knexfile");

// module.exports = knex(knexConfig.sqlite);
module.exports = knex(knexConfig.development);

//added HEROKU POSGRESQL DB for testing
//module.exports = knex(knexConfig.heroku);
// -> not sure how to set up external HEROKU DB
//DATABASE_URL=heroku pg:psql postgresql-rigid-75651 --app labs8ratemydiy
