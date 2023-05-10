const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  { mongodbConnect, mongoDBStore } = require("./utility/database"),
  User = require("./models/users");

const PORT = 4000;
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

// Auth
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findOne(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.error(error));
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
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({
        username: "Musto",
        email: "musto@mail.com",
        cart: { items: [] },
      });
      user.save();
    }
  });

  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
