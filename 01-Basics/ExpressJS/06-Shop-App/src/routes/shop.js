const router = require("express").Router(),
  {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    postCart,
    postCartItemDelete,
    getCheckout,
    getOrders,
    postOrderCreate,
    postOrderItemDelete,
  } = require("../controllers/shop"),
  authFirewall = require("../middleware/auth");

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
  .get(authFirewall, getCart) // GET
  .post(authFirewall, postCart); // POST

router
  .route("/cart-item-delete") // ROUTE: /cart-item-delete
  .post(authFirewall, postCartItemDelete); // POST

router
  .route("/orders") // ROUTE: /orders
  .get(authFirewall, getOrders); // GET

router
  .route("/order-create") // ROUTE: /order-create
  .post(authFirewall, postOrderCreate); // POST

router
  .route("/order-item-delete") // ROUTE: /order-item-delete
  .post(authFirewall, postOrderItemDelete); // DELETE

router
  .route("/checkout") // ROUTE: /checkout
  .get(authFirewall, getCheckout); // GET

module.exports = router;
