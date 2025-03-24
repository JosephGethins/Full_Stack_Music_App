// const mysql = require('mysql2');
// require('dotenv').config();

// // Create the database connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST || 'webcourse.cs.nuim.ie', 
//     user: process.env.DB_USER || 'u240213',
//     password: process.env.DB_PASSWORD || 'ooJ8Eimoo9ainahX',
//     database: process.env.DB_NAME || 'cs230_u240213',
//     port: process.env.DB_PORT || 3306,
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// module.exports = db;

// import mysql from "mysql2/promise";

// const db = {
//     host: "webcourse.cs.nuim.ie",
//     user: "u240213",
//     password: "ooJ8Eimoo9ainahX",
//     database: "cs230_u240213"
// };

// async function testDB() {
//     try {
//         const conn = await mysql.createConnection(db);  // Use 'db' instead of 'dbConfig'
//         const [rows] = await conn.query("SELECT 1+1 AS result");
//         console.log("connected: ", rows[0].result);
//         await conn.end();
//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

// testDB(); // Run the test query when the file loads

// // You can export the connection here if needed elsewhere in the project
// const conn = await mysql.createConnection(db);

// let result = await conn.query("SELECT 1+1 as two");

// console.log(result[0][0]);

// await conn.end();

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'webcourse.cs.nuim.ie',
  user: 'u240213',
  password: 'ooJ8Eimoo9ainahX',
  database: 'cs230_u240213',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Error:', err);
  } 
  else {
    console.log('MySQL Connected!');
  }
});

module.exports = db;

