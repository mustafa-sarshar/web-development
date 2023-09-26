const router = require("express").Router(),
  path = require("path"),
  { pathRoot } = require("../utility/paths"),
  { products, getProductsGet } = require("../controllers/products");

router.route("/").get(getProductsGet);

module.exports = { router };
