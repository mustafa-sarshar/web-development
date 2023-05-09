const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  { mongodbConnect } = require("./utility/database"),
  User = require("./models/users");

const app = express();
const PORT = 4000;

const { router: adminRoutes } = require("./routes/admin");
const { router: shopRoutes } = require("./routes/shop");
const { router: pageNotFoundRoutes } = require("./routes/error");

// Set the Templating Engine/Method -> EJS | PUG | Handlebars
// Set view settings for EJS
app.set("view engine", "ejs");
// Set the templates directory
app.set("views", "src/views");

// Set global middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Auth
app.use((req, res, next) => {
  User.findOne()
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
  app.listen(4000, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
