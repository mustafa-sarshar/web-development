const errorPageNotFound = (req, res, next) => {
  res.render("error/404", {
    pageTitle: "Page Not Found!",
    path: "404",
  });
};

module.exports = { errorPageNotFound };
