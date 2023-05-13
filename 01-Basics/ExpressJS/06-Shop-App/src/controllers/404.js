const {
  renderParamsCommon,
  renderParams404,
} = require("../constants/renderParams");

const errorPageNotFound = (req, res, next) => {
  res.render("error/404", {
    ...renderParams404,
    ...renderParamsCommon,
  });
};

module.exports = { errorPageNotFound };
