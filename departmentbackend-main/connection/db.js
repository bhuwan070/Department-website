const sql = require('mysql2');
require('dotenv').config();
// Create a connection to the database
const db = sql.createConnection({
  host: process.env.sqlhost,
  user: process.env.sqluser,
  password: process.env.sqlpassword,
  database: process.env.sqldatabase,
});
// Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database as id ' + connection.threadId);
// });

module.exports = { db };
