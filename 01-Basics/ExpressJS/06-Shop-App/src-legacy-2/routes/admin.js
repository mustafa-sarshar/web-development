const router = require("express").Router(),
  {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
  } = require("../controllers/admin");

// sub-routes for /admin
router
  .route("/add-product") // ROUTE: /admin/add-product
  .get(getAddProduct) // GET
  .post(postAddProduct); // POST

router
  .route("/edit-product/:id") // ROUTE: /admin/edit-product/{productId}
  .get(getEditProduct) // GET
  .post(postEditProduct); // POST

router
  .route("/products") // ROUTE: /admin/products
  .get(getProducts); // GET

module.exports = { router };
