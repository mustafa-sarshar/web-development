const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  db = require("./utility/database"),
  Product = require("./models/products"),
  User = require("./models/users"),
  Cart = require("./models/carts"),
  CartItem = require("./models/cart-items");

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
  User.findByPk(1)
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

// Define Associations between models
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Init the Database -->> run the Server
const FORCE_DB_OVERWRITE = false;
db.sync({ force: FORCE_DB_OVERWRITE })
  .then((results) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ username: "Musto", email: "musto@mail.com" });
    } else {
      return user;
    }
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    console.log("User is activated!");
    app.listen(4000, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
