const router = require("express").Router(),
  { signUp, login } = require("../controllers/auth"),
  { signUpValidation, loginValidation } = require("../utility/validator");

router
  .route("/signup") // ROUTE: /auth
  .post(signUpValidation, signUp); // POST

router
  .route("/login") // ROUTE: /auth
  .post(loginValidation, login); // POST

module.exports = router;
