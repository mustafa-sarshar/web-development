const mongoose = require("mongoose");

const password = process.env["MONGODB_PASS"];
const DB_NAME = "onlineshop";
let _db;

const mongodbConnect = (callback) => {
  mongoose
    .connect(
      `mongodb+srv://mustisar4:${password}@cluster0.5eqee6n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((client) => {
      console.log("MongoDB Connected!");
      callback();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

module.exports = { mongodbConnect };
