const router = require("express").Router(),
  {
    getLogin,
    postLogin,
    postLogout,
    getSignUp,
    postSignUp,
    getResetPassword,
    postResetPassword,
    getSetNewPassword,
    postSetNewPassword,
  } = require("../controllers/auth"),
  {
    signUpFieldsValidation,
    loginFieldsValidation,
  } = require("../utility/validators");

router
  .route("/login") // /auth/login
  .get(getLogin) // GET
  .post(loginFieldsValidation, postLogin); // POST

router
  .route("/sign-up") // /auth/sign-up
  .get(getSignUp) // GET
  .post(signUpFieldsValidation, postSignUp); // POST

router
  .route("/logout") // /auth/logout
  .post(postLogout); // POST

router
  .route("/reset-password") // /auth/reset-password
  .get(getResetPassword) // GET
  .post(postResetPassword); // POST

router
  .route("/set-new-password/:token") // /auth/set-new-password/{token}
  .get(getSetNewPassword); // GET

router
  .route("/set-new-password") // /auth/set-new-password
  .post(postSetNewPassword); // POST

module.exports = router;
