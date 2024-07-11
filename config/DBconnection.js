// dbConnection.js
const { Pool } = require("pg");
require("dotenv").config();

const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.DATABASEPASSWORD;
const port = process.env.DATABASEPORT;

console.log("Database Config:", { user, host, database, password, port });

const dbConnection = new Pool({
  user,
  host,
  database,
  password,
  port,
});

dbConnection
  .query("SELECT NOW()")
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((error) => {
    console.log("Not Able To Connect To Database", error);
  });

module.exports = dbConnection;
