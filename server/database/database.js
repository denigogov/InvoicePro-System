require("dotenv").config();
const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connecting with the database
database
  .getConnection()
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(`Database Connection Error: ${err}`);
  });

module.exports = database;
