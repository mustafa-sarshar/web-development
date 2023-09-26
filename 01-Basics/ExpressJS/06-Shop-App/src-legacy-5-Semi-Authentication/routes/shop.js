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
  .route("/cart-item-delete") // ROUTE: /cart-item-delete
  .post(postCartItemDelete); // POST

router
  .route("/orders") // ROUTE: /orders
  .get(getOrders); // GET

router
  .route("/order-create") // ROUTE: /order-create
  .post(postOrderCreate); // POST

router
  .route("/order-item-delete") // ROUTE: /order-item-delete
  .post(postOrderItemDelete); // DELETE

router
  .route("/checkout") // ROUTE: /checkout
  .get(getCheckout); // GET

module.exports = router;
