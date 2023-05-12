const router = require("express").Router(),
  { getLogin, postLogin, getLogout } = require("../controllers/auth");

router
  .route("/login") // /auth/login
  .get(getLogin) // GET
  .post(postLogin); // POST

router
  .route("/logout") // /auth/logout
  .get(getLogout); // GET

module.exports = router;
