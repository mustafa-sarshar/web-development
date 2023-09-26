const express = require("express");
const path = require("path");

const app = express();
const personRoute = require("./routes/person");

// Define Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});
app.use(personRoute);
app.use(express.static("public"));

// Handler for 404 - Page Not Found
app.use((req, res, next) => {
    res.status(404).send("Page Not Found!!!");
});

// Error Handler: 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, "../public/500.html"));
});

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));