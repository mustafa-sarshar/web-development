const { check, body } = require("express-validator"),
  User = require("../models/users");

const signUpFieldsValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email!")
    .custom(async (value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("This email is not available!");
        }
      });
    }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric!"),
  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords are not identical!");
    }
    return true;
  }),
];

const loginFieldsValidation = [
  check("email").isEmail().withMessage("Please enter a valid email!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric!"),
];

module.exports = { signUpFieldsValidation, loginFieldsValidation };
