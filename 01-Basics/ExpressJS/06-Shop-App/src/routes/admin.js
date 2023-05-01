const router = require("express").Router(),
  {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
  } = require("../controllers/admin");

// sub-routes for /admin
router
  .route("/add-edit-product") // ROUTE: /admin/add-product
  .get(getAddProduct) // GET
  .post(postAddProduct); // POST

router
  .route("/add-edit-product/:id") // ROUTE: /admin/edit-product/{productId}
  .get(getEditProduct); // GET

router
  .route("/products") // ROUTE: /admin/products
  .get(getProducts); // GET

module.exports = { router };
