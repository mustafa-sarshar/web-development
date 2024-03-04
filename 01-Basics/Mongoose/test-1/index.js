// getting-started.js
const mongoose = require("mongoose");

const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "connection error:"));
dbConnection.once("open", async function () {
  console.log("mongodb is connected!!");

  const users = dbConnection.db.collection("Users");

  const usersData = await users.find({});
  console.log(usersData);
  //   , function (err, collection) {
  //     collection.find({}).toArray(function (err, data) {
  //       console.log(data); // it will print your collection data
  //     });
  //   });
});

main()
  .then(async (res) => {})
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/main?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
