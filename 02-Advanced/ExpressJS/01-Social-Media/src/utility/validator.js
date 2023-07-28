const { body } = require("express-validator"),
  User = require("../models/users");

exports.createPostValidation = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long!"),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long!"),
];

exports.updatePostValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long!"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long!"),
];

exports.signUpValidation = [
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is required!")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long!"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is not valid!")
    .custom(async (value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("This email is already registered!");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 8 characters long!"),
];

exports.loginValidation = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is not valid!")
    .normalizeEmail(),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!"),
];

exports.updateUserValidation = [
  body("username")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is required!")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long!"),
  body("email")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is not valid!")
    .custom(async (value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("This email is already registered!");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 8 characters long!"),
];

exports.updateUserStatusValidation = [body("status").trim().not().isEmpty()];

body("username")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Username is required!")
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long!")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Username must be alphabetic.");

