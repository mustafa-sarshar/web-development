const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const password = process.env["MONGODB_PASS"];
const DB_NAME = "onlineshop";
let _db;

const mongodbConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://mustisar4:${password}@cluster0.5eqee6n.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("MongoDB Connected!");
      _db = client.db(DB_NAME);
      callback();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = { mongodbConnect, getDb };
