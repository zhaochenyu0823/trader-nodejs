import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string, 10), // 注意这里应该是 DB_PORT
});

pool
  .getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default pool;
