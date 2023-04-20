const router = require("express").Router(),
  { addProductGet, addProductPost } = require("../controllers/products");

// sub-routes for /admin
router.route("/add-product").get(addProductGet).post(addProductPost);

module.exports = { router };
