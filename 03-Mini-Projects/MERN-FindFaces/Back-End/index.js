// Apply configurations
require("dotenv").config();
require("./config/dbConnection.js").connectDB();

// Import libs and objects
const express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    swaggerUi = require("swagger-ui-express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    { logHandler } = require("./middleware/logHandler.js"),
    { errorHandler } = require("./middleware/errorHandler.js"),
    { corsOptions } = require("./config/corsOptions.js"),
    { logEvents } = require("./utils/logger.js"),
    { objDataExtractor } = require("./utils/helperFunctions.js"),
    swaggerJSON = require("./public/documentation/swagger.json");

// Run the App
const app = express();

// Set middleware
app.use(logHandler);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Set routes
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require(path.join(__dirname, "routes", "root.js")));
app.use("/users", require(path.join(__dirname, "routes", "users.js")));
app.use("/posts", require(path.join(__dirname, "routes", "posts.js")));

// Set routes --- Swagger UI for API Documentation
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSON, { explorer: true })
);

app.route("*").all((req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "errors", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404, Page Not Found!" });
    } else {
        res.type("txt").send("404, Page Not Found!");
    }
});

// Set an Error Handler Middleware
app.use(errorHandler);

// Apply settings for running the server
const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log("Database is connected successfully!!!");
        console.log(`The server is running on port: ${PORT}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(objDataExtractor(err), "dbLog");
});
