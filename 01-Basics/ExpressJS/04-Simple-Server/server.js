const
    express = require("express"),
    path = require("path"),
    cors = require("cors"),
    { logger } = require("./middleware/log_events"),
    errorHandler = require("./middleware/error_handlers");

const app = express();
const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(logger);
// Any server you wanna allow to access your server or backend
const whitelist = ["https://www.website.com", "http://127.0.0.1:8080"];
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))     // Cross Origin Resource Sharing
app.use(express.urlencoded({ extended: false }));   // to form data
app.use(express.json());    // to understand json

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

// Import Routes
app.use("/", require("./routes/root"));     // Use root routes
app.use("/subdir", require("./routes/subdir"));     // Use subdir routes
app.use("/employees", require("./routes/api/employees"));     // Use employees routes


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

// Start the server and listen to events on port ...
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
