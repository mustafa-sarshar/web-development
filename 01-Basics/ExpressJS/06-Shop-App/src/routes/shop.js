const router = require("express").Router(),
  { products, getProductsGet } = require("../controllers/products");

router.route("/").get(getProductsGet);

module.exports = { router };
