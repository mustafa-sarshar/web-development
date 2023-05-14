const authFirewall = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports = authFirewall;
