const { Client } = require('pg');
const client = new Client({ connectionString: 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable' });
client.connect()
  .then(() => client.query('SELECT * FROM "Tour"'))
  .then(res => console.log(res.rows))
  .catch(console.error)
  .finally(() => client.end());
