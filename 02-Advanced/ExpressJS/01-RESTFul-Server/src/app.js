"use strict";
require("dotenv").config();

const express = require("express"),
  path = require("path"),
  bodyParse = require("body-parser"),
  multer = require("multer"),
  { corsMiddleware } = require("./config/cors"),
  { mongodbConnect } = require("./utility/database"),
  {
    multerFileFilter,
    multerDiskStorage,
  } = require("./config/multerSettings");

const SERVER_PORT = process.env["SERVER_PORT"],
  SERVER_IP = process.env["SERVER_IP"];

const app = express();

// Extract Routers
const feedRoutes = require("./routes/feed");

// Set middleware
// app.use(bodyParse.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParse.json()); // application/json
app.use(
  multer({ storage: multerDiskStorage, fileFilter: multerFileFilter }).single(
    "image"
  )
);
// CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(corsMiddleware);

app.use("/src/data", express.static(path.join(__dirname, "data")));

// Routes
app.use("/feed", feedRoutes);

// Error Handler
app.use((error, req, res, next) => {
  let { statusCode, message, errorData } = error;
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    message: message,
    errorData: errorData,
  });
  console.error(error);
});

// Init the Database -->> run the Server
mongodbConnect(() => {
  app.listen(SERVER_PORT, SERVER_IP, () => {
    console.log(`App is running @${SERVER_IP}:${SERVER_PORT}`);
  });
});
