const router = require("express").Router(),
  { getError404, getError500 } = require("../controllers/error");

router
  .route("/404") // /error/404
  .get(getError404); // GET

router
  .route("/500") // /error/500
  .get(getError500); // GET

module.exports = router;
