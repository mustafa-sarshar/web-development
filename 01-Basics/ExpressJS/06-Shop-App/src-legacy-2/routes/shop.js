const router = require("express").Router(),
  {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    postCart,
    getCheckout,
    getOrders,
  } = require("../controllers/shop");

router
  .route("/") // ROUTE: /
  .get(getIndex); // GET

router
  .route("/products") // ROUTE: /products
  .get(getProducts); // GET

router
  .route("/products/:id") // ROUTE: /products/{id}
  .get(getProduct); // GET

router
  .route("/cart") // ROUTE: /cart
  .get(getCart) // GET
  .post(postCart); // POST

router
  .route("/orders") // ROUTE: /orders
  .get(getOrders); // GET

router
  .route("/checkout") // ROUTE: /checkout
  .get(getCheckout); // GET

module.exports = { router };
