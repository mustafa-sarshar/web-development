const bcrypt = require("bcryptjs"),
  { httpStatus } = require("../constants/http-status"),
  { bcryptSalt } = require("../constants/encryption"),
  validator = require("validator"),
  User = require("../models/users");

module.exports = {
  greet: function () {
    return "Hello World!";
  },
  createUser: async (args, req) => {
    const { username, email, password } = args;
    const errors = [];

    // Validation
    if (!validator.isEmail(email)) {
      errors.push("Email is invalid!");
    }
    if (validator.isEmpty(password) || !validator.isLength(password, 5)) {
      errors.push("Password is invalid!");
    }
    if (errors.length > 0) {
      const err = new Error("Invalid Inputs!");
      err.data = errors;
      err.code = 422;
      throw err;
    }

    const userFound = await User.findOne({ email: email });
    if (userFound) {
      throw new Error("Email is not available!");
    }

    const passHashed = await bcrypt.hash(password, bcryptSalt);
    const userNew = await new User({
      username: username,
      email: email,
      password: passHashed,
      status: "NEW USER",
    }).save();
    return { ...userNew._doc, userId: userNew._id };
  },
};
