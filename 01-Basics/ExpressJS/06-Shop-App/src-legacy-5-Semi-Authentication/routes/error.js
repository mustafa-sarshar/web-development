const router = require("express").Router(),
  { errorPageNotFound } = require("../controllers/404");

router.use(errorPageNotFound);

module.exports = router;
