const mongoose = require("mongoose");

const DB_URI = process.env["DB_URI"];

exports.mongodbConnect = (callback) => {
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
