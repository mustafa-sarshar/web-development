"use strict";
require("dotenv").config();

const path = require("path"),
  express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  { corsMiddleware } = require("./config/cors"),
  { mongodbConnect } = require("./utility/database"),
  { multerFileFilter, multerDiskStorage } = require("./config/multerSettings"),
  passportSetup = require("./config/passport-setup");

const SERVER_PORT = process.env["SERVER_PORT"],
  SERVER_IP = process.env["SERVER_IP"];

const app = express();
const server = http.createServer(app);
const io = require("./socketIO").init(server);

// Extract Routers
const feedRoutes = require("./routes/feed"),
  authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user");

// Set middleware
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
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

// Routes
app.use("/src/data", express.static(path.join(__dirname, "data")));
app.use("/feeds", feedRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

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
  server.listen(SERVER_PORT, SERVER_IP, () => {
    console.log(`App is running @${SERVER_IP}:${SERVER_PORT}`);
  });
  // const serverIO = new Server(server);
  io.on("connection", (socket) => {
    console.log("Client connected!", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
});
