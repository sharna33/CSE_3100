import { createPool } from 'mysql2';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if(err) {
    console.error("An error occurred while connecting to the database:", err);
  } else {
    console.log("Successfully connected to the database.");
    connection.release();
  }
});

export default pool.promise();