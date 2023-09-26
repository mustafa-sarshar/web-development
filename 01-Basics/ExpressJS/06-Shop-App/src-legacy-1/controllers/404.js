const errorPageNotFound = (req, res, next) => {
  // res.status(404).sendFile(path.join(pathRoot, "views", "404.html")); // for normal .html template
  // res.render("404", { pageTitle: "Page Not Found!" }); // for .pug template
  res.render("404", { pageTitle: "Page Not Found!", path: "404" }); // for .handlebars template
};

module.exports = { errorPageNotFound };
