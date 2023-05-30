const bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  { validationResult } = require("express-validator"),
  { httpStatus } = require("../constants/http-status"),
  { bcryptSalt } = require("../constants/encryption"),
  User = require("../models/users");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const err = new Error("No user found!");
      err.statusCode = httpStatus.notFound.code;
      throw err;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const err = new Error("Wrong credentials!");
      err.statusCode = httpStatus.unauthorized.code;
      throw err;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env["JWT_SECRET_KEY"],
      { expiresIn: "1h" }
    );
    res.status(httpStatus.success.code).json({
      message: "User logged in successfully!",
      result: { token: token, userId: user._id.toString() },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const { username, email, password } = req.body;

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();

    throw err;
  }

  try {
    const passHashed = await bcrypt.hash(password, bcryptSalt);

    const userNew = await new User({
      username: username,
      email: email,
      password: passHashed,
      status: "NEW USER",
    }).save();
    res.status(httpStatus.successfulCreation.code).json({
      message: "User created successfully!",
      result: { userId: userNew._id },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.authGoogle = (req, res, next) => {
  return passport.authenticate("google", { scope: ["profile"] });
};

exports.authGoogleDone = (req, res, next) => {
  console.log("DONE");
  next();
};

exports.authGoogleRedirect = (req, res, next) => {
  console.log("REDIRECT");
  next();
};
