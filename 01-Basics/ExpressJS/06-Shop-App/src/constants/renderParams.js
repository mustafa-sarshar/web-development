const bcrypt = require("bcryptjs");

// General
exports.renderParamsCommon = {
  errorMessage: [],
  successMessage: [],
  warnMessage: [],
  validationErrors: [],
  oldInputs: {},
};

// Auth
exports.renderParamsLogin = { pageTitle: "Login", path: "/auth/login" };
exports.renderParamsSignUp = { pageTitle: "Sign Up", path: "/auth/sign-up" };
exports.renderParamsResetPassword = {
  pageTitle: "Reset Password",
  path: "/auth/reset-password",
};

// Shop
exports.renderParamsIndex = {
  pageTitle: "My Shops",
  path: "/shop/index",
};
exports.renderParamsProducts = {
  pageTitle: "My Shops",
  path: "/shop/products",
};
exports.renderParamsDetails = {
  pageTitle: "My Shops - ",
  path: "/shop/product-details",
};
exports.renderParamsCart = {
  pageTitle: "My Cart",
  path: "/shop/cart",
};
exports.renderParamsOrders = {
  pageTitle: "My Orders",
  path: "/shop/orders",
};
exports.renderParamsCheckout = {
  pageTitle: "Checkout",
  path: "/shop/checkout",
};

// Admin
exports.renderParamsAdminProducts = {
  pageTitle: "Admin Products",
  path: "/admin/products",
};
exports.renderParamsAdminAddProducts = {
  pageTitle: "Add Product",
  path: "/admin/add-product",
};
exports.renderParamsAdminEditProduct = {
  pageTitle: "Edit Product",
  path: "/admin/edit-product",
};

// 404
exports.renderParams404 = {
  pageTitle: "Page Not Found!",
  path: "404",
};

// Data manipulation

exports.bcryptSalt = bcrypt.genSaltSync(10);
