const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM "AdminUser"');
    console.log('---ADMIN_USERS_START---');
    console.log(JSON.stringify(res.rows, null, 2));
    console.log('---ADMIN_USERS_END---');
  } finally {
    client.release();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
