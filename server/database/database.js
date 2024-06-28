require("dotenv").config();
const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV !== "test" ? process.env.DB_NAME : process.env.DB_TEST,
});

// connecting with the database
database
  .getConnection()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(`someting happen ${err}`);
  });

module.exports = database;
