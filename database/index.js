const { Pool, Client } = require('pg');
const { host, user, password } = require('../config.js');

const pool = new Pool({
  user: user,
  host: host,
  database: 'expresso',
  password: password, // password for database
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log('postgres connected :)');
  })
  .catch((err) => {
    console.log('err: ', err);
  });

module.exports = pool;
