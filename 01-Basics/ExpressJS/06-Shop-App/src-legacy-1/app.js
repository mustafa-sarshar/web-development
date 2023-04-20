const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  handlebars = require("express-handlebars");

const app = express();
const PORT = 4000;

const { router: adminRoutes } = require("./routes/admin");
const { router: shopRoutes } = require("./routes/shop");
const { router: pageNotFoundRoutes } = require("./routes/error");

// Set the Templating Engine/Method -> EJS | PUG | Handlebars
// Set view settings for EJS
app.set("view engine", "ejs");

// Set view settings for Handlebars
// app.engine(
//   "handlebars",
//   handlebars.engine({ layoutsDir: "src/views/layouts/", defaultLayout: "layout-main" })
// );
// app.set("view engine", "handlebars");

// Set view settings for PUG
// app.set("view engine", "pug");

// Set the templates directory
app.set("views", "src/views");

// Set global middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set static routes
app.use(express.static(path.join(__dirname, "static")));

// Set component routes
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

// Handle errors
// 404 Page Not Found Error
app.use(pageNotFoundRoutes);

app.listen(4000, () => {
  console.log(`App is running on port ${PORT}`);
});
