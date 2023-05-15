"use strict";
require("dotenv").config();

const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  // cookieParser = require("cookie-parser"),
  session = require("express-session"),
  csurf = require("csurf"),
  flash = require("connect-flash"),
  { mongodbConnect, mongoDBStore } = require("./utility/database"),
  {
    multerFileFilter,
    multerDiskStorage,
  } = require("./constants/multerSettings"),
  { getUser } = require("./controllers/auth");

const SERVER_PORT = process.env["SERVER_PORT"];
const SERVER_IP = process.env["SERVER_IP"];
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorRoutes = require("./routes/error");

// Set the Templating Engine/Method -> EJS | PUG | Handlebars
// Set view settings for EJS
app.set("view engine", "ejs");
// Set the templates directory
app.set("views", "src/views");

// Set global middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: multerDiskStorage, fileFilter: multerFileFilter }).single(
    "image"
  )
);
// app.use(cookieParser());
app.use(
  session({
    secret: "d1abea63236dab4f405234961fa1fd1ededf1648cd8f04e8a55ace98163ed22d",
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
  })
);
app.use(csurf()); // CSRF Protection middleware
app.use(flash()); // Flash middleware for flash message handling.

// Set local variables in responses
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  // res.locals.errorMessage = req.flash("errorMessage");
  // res.locals.successMessage = req.flash("successMessage");
  // res.locals.warnMessage = req.flash("warnMessage");
  next();
});

// Auth Middleware
app.use(getUser);

// Set static routes
app.use(express.static(path.join(__dirname, "static")));
app.use("/src/data", express.static(path.join(__dirname, "data")));

// Set component routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/", shopRoutes);

// Handle errors
app.use("/error", errorRoutes);
app.use((error, req, res, next) => {
  if (!error.httpStatusCode) {
    error.httpStatusCode = 500;
  }
  res.status(error.httpStatusCode).render("error/" + error.httpStatusCode, {
    pageTitle: "Error!",
    path: "error/" + error.httpStatusCode,
  });
});

// Init the Database -->> run the Server
mongodbConnect(() => {
  app.listen(SERVER_PORT, SERVER_IP, () => {
    console.log(`App is running @${SERVER_IP}:${SERVER_PORT}`);
  });
});
