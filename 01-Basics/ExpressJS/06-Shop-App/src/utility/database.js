const mongoose = require("mongoose"),
  session = require("express-session"),
  MongoDBStore = require("connect-mongodb-session")(session);

const password = process.env["MONGODB_PASS"];
const DB_NAME = "onlineshop";
const DB_URI = `mongodb+srv://mustisar4:${password}@cluster0.5eqee6n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const mongodbConnect = (callback) => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("MongoDB Connected!");
      callback();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const mongoDBStore = new MongoDBStore({
  uri: DB_URI,
  collection: "sessions",
});

module.exports = { mongodbConnect, mongoDBStore };
