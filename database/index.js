const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '',
  database: 'Expresso',
  password: '', // password for database
  port: 5432,
});

// pool
//   .connect()
//   .then(() => {
//     console.log('postgres connected :)');
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   });

// module.exports = pool;