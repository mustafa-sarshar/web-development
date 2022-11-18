const
    express = require("express"),
    path = require("path"),
    { logger, logEvents } = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require(path.join(__dirname, "routes", "root.js")));


app.route("*")
    .all((req, res) => {
        res.status(404);
        if (req.accepts("html")) {
            res.sendFile(path.join(__dirname, "views", "errors", "404.html"));
        } else if(req.accepts("json")) {
            res.json({ message: "404, Page Not Found!" });
        } else {
            res.type("txt").send("404, Page Not Found!");
        }
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`The server is running on port: ${PORT}`) });

