const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "onlineshop",
  "root",
  process.env["MYSQL_PASS"],
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
