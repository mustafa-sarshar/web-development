"use strict";
require("dotenv").config();

const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  csurf = require("csurf"),
  flash = require("connect-flash"),
  { mongodbConnect, mongoDBStore } = require("./utility/database"),
  User = require("./models/users");

const SERVER_PORT = process.env["SERVER_PORT"];
const SERVER_IP = process.env["SERVER_IP"];
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const pageNotFoundRoutes = require("./routes/error");

// Set the Templating Engine/Method -> EJS | PUG | Handlebars
// Set view settings for EJS
app.set("view engine", "ejs");
// Set the templates directory
app.set("views", "src/views");

// Set global middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
  })
);
app.use(csurf()); // CSRF Protection middleware
app.use(flash()); // Flash middleware for flash message handling.

// Auth Middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findOne({ _id: req.session.user._id })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.error(error));
});

// Set local variables in responses
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  // res.locals.errorMessage = req.flash("errorMessage");
  // res.locals.successMessage = req.flash("successMessage");
  // res.locals.warnMessage = req.flash("warnMessage");
  next();
});

// Set static routes
app.use(express.static(path.join(__dirname, "static")));

// Set component routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/", shopRoutes);

// Handle errors
// 404 Page Not Found Error
app.use(pageNotFoundRoutes);

// Init the Database -->> run the Server
mongodbConnect(() => {
  app.listen(SERVER_PORT, SERVER_IP, () => {
    console.log(`App is running @${SERVER_IP}:${SERVER_PORT}`);
  });
});
