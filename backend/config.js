const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pruk2543',
  database: 'gracenotes',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

module.exports = pool;