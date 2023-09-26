const mongoose = require("mongoose"),
  session = require("express-session"),
  MongoDBStore = require("connect-mongodb-session")(session);

const DB_URI = process.env["DB_URI"];

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
