const User = require("../models/users");

const getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

const postLogin = (req, res, next) => {
  User.findOne()
    .then((user) => {
      req.session.user = user;
      req.session.isAuthenticated = true;
      req.session.save((error) => {
        res.redirect("/");
        console.error(error);
      });
    })
    .catch((error) => {
      // req.session.user = null;
      // req.session.isAuthenticated = false;
      res.redirect("/");
      console.error(error);
    });
};

const getLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
    }
    res.redirect("/");
  });
};

module.exports = { getLogin, postLogin, getLogout };
