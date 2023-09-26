const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  refresh_token: { type: String },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
