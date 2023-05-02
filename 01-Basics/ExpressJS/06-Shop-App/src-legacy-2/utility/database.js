const mysql = require("mysql2");

const poolConfigs = {
  host: "localhost",
  user: "root",
  database: "onlineshop",
  password: process.env["MYSQL_PASS"],
};
const pool = mysql.createPool(poolConfigs);

module.exports = pool.promise();
