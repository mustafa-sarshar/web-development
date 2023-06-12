"use strict";
require("dotenv").config();

const fs = require("fs"),
  path = require("path"),
  express = require("express"),
  http = require("http"),
  https = require("https"),
  helmet = require("helmet"),
  compression = require("compression"),
  morgan = require("morgan"),
  { createHandler } = require("graphql-http/lib/use/express"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  { corsMiddleware } = require("./config/cors"),
  { mongodbConnect } = require("./utility/database"),
  { multerFileFilter, multerDiskStorage } = require("./config/multerSettings"),
  passportSetup = require("./config/passport-setup");

const SERVER_PORT = process.env["SERVER_PORT"],
  SERVER_IP = process.env["SERVER_IP"],
  DEV_MODE = process.env["NODE_ENV"] === "production" ? false : true;

// Import certificates
const privateKey = fs.readFileSync("server.key"),
  certificate = fs.readFileSync("server.cert");

const app = express();
const server = http.createServer(app);
// const server = https.createServer({ key: privateKey, cert: certificate }, app);
const io = require("./socketIO").init(server);

// Define the Logger
const logStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

// Extract Routers
// const feedRoutes = require("./routes/feed"),
//   authRoutes = require("./routes/auth"),
//   userRoutes = require("./routes/user");

// Extract GraphQL objects
const graphqlSchemas = require("./graphql/schemas"),
  graphqlResolvers = require("./graphql/resolvers");

// Set middleware
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(helmet()); // security
app.use(compression()); //Compress response data with gzip/deflate
app.use(morgan("combined", { stream: logStream })); // for logging
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
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(corsMiddleware);

// Routes
app.use("/src/data", express.static(path.join(__dirname, "data")));
// app.use("/feeds", feedRoutes);
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);

app.use(
  "/graphql",
  createHandler({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    formatError(error) {
      if (!error.originalError) {
        return error;
      }
      const { data, code, message } = error.originalError;
      return {
        data: data,
        status: code || 500,
        message: message || "An error occurred!",
      };
    },
  })
);
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphqlSchemas,
//     rootValue: graphqlResolvers,
//     graphiql: DEV_MODE,
//     pretty: true,
//   })
// );

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
