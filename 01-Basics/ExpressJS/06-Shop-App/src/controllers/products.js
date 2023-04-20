const Product = require("../models/products");

const addProductGet = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "add-product",
    activeAddProduct: true,
  });
};

const addProductPost = (req, res, next) => {
  const dataSubmitted = req.body;
  const product = new Product(dataSubmitted.title);
  product.save();
  console.log(product);
  res.redirect("/");
};

const getProductsGet = (req, res, next) => {
  // Product.establishDatabase();
  const products = Product.fetchAll((data) => {
    console.log("DATA saved:", data);
    res.render("shop", {
      products: data,
      hasProducts: data.length > 0,
      pageTitle: "My Shops",
      path: "shop",
      activeShop: true,
    });
  });
};

module.exports = { addProductGet, addProductPost, getProductsGet };
