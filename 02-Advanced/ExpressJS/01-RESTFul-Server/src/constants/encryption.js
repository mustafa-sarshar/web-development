const bcrypt = require("bcryptjs");

exports.bcryptSalt = bcrypt.genSaltSync(10);
