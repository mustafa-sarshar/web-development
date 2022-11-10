"use strict";
require("dotenv").config();
const
    express = require("express"),
    path = require("path"),
    cors = require("cors"),
    { logger } = require("./middleware/log_events"),
    errorHandler = require("./middleware/error_handlers"),
    { corsOptions } = require("./config/cors_options"),
    mongoose = require("mongoose"),
    connectDB = require("./config/db_connection");

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(logger);
app.use(cors(corsOptions))     // Cross Origin Resource Sharing
app.use(express.urlencoded({ extended: false }));   // to form data
app.use(express.json());    // to understand json

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

// Import Routes
app.use("/", require("./routes/root"));     // Root routes
app.use("/subdir", require("./routes/subdir"));     // subdir routes
app.use("/users", require("./routes/api/users"));     // Users routes
app.use("/auth", require("./routes/auth"));     // Auth routes
app.use("/employees", require("./routes/api/employees"));     // Employees routes


// Hello Page
app.get("/hello(.html)?", (req, res, next) => {
    res.send("Hello Hello Hello");
    next();
}, (req, res) => {
    console.log("Hello Hello Hello");
});

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt")
            .send("404 Not Found");
    }
});

// Error Handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to Database");
    // Start the server and listen to events on port ...
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
});
