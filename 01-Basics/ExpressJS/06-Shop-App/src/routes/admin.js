const router = require("express").Router(),
  {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
  } = require("../controllers/admin"),
  authFirewall = require("../middleware/auth");

// sub-routes for /admin
router
  .route("/add-product") // ROUTE: /admin/add-product
  .get(authFirewall, getAddProduct) // GET
  .post(authFirewall, postAddProduct); // POST

router
  .route("/edit-product/:id") // ROUTE: /admin/edit-product/{productId}
  .get(authFirewall, getEditProduct) // GET
  .post(authFirewall, postEditProduct); // POST

router
  .route("/delete-product/:id") // ROUTE: /admin/delete-product/{productId}
  .post(authFirewall, postDeleteProduct); // POST

router
  .route("/products") // ROUTE: /admin/products
  .get(authFirewall, getProducts); // GET

module.exports = router;
