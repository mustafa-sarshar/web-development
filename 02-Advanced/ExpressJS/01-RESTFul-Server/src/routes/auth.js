const router = require("express").Router(),
  passport = require("passport"),
  {
    signUp,
    login,
    authGoogleRedirect,
    authGoogle,
    authGoogleDone,
  } = require("../controllers/auth"),
  { signUpValidation, loginValidation } = require("../utility/validator");

router
  .route("/signup") // ROUTE: /auth/signup
  .post(signUpValidation, signUp); // POST

router
  .route("/google") // ROUTE: /auth/google
  .get(authGoogle, authGoogleDone); // GET

router
  .route("/google/redirect") // ROUTE: /auth/google/redirect
  .get(authGoogleRedirect); // GET

router
  .route("/login") // ROUTE: /auth/login
  .post(loginValidation, login); // POST

module.exports = router;
