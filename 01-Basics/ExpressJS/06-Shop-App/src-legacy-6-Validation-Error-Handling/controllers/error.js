const {
  renderParamsCommon,
  renderParams404,
  renderParams500,
} = require("../constants/renderParams");

const getError404 = (req, res, next) => {
  res.render("error/404", {
    ...renderParams404,
    ...renderParamsCommon,
  });
};

const getError500 = (req, res, next) => {
  res.render("error/500", {
    ...renderParams500,
    ...renderParamsCommon,
  });
};

module.exports = { getError404, getError500 };
