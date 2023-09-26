const { check, body } = require("express-validator"),
  User = require("../models/users"),
  Product = require("../models/products");

const signUpFieldsValidation = [
  check("email")
    .isEmail()
    .trim()
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
    .trim()
    .withMessage("Password must be alphanumeric!"),
  body("passwordConfirm")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords are not identical!");
      }
      return true;
    }),
];

const loginFieldsValidation = [
  check("email").isEmail().trim().withMessage("Please enter a valid email!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!")
    .isAlphanumeric()
    .trim()
    .withMessage("Password must be alphanumeric!"),
];

const addProductValidation = [
  check("title")
    .custom((value) => {
      return value.match(/^[0-9A-Za-z ]+$/);
    })
    .withMessage("Title must be alphanumeric!")
    .isLength({ min: 3 })
    .withMessage("Title must be at list 3 characters long!")
    .trim()
    .custom(async (value) => {
      return Product.findOne({ title: value }).then((product) => {
        if (
          product &&
          product.title.toLocaleLowerCase() === value.toLocaleLowerCase()
        ) {
          return Promise.reject("This book is already added!");
        }
      });
    }),
  check("price").isFloat().withMessage("Price must be numeric!"),
  check("description")
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must be between 5-255 characters long!"),
];

const editProductValidation = [
  check("title")
    .custom((value) => {
      return value.match(/^[0-9A-Za-z ]+$/);
    })
    .withMessage("Title must be alphanumeric!")
    .isLength({ min: 3 })
    .withMessage("Title must be at list 3 characters long!")
    .trim(),
  check("price").isFloat().withMessage("Price must be numeric!"),
  check("description")
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must be between 5-255 characters long!"),
];

module.exports = {
  signUpFieldsValidation,
  loginFieldsValidation,
  addProductValidation,
  editProductValidation,
};
