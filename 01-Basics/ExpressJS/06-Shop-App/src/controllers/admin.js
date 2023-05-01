const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  // console.log(product);
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  Product.fetchAll((data) => {
    // console.log("DATA saved (@/admin/products):", data);
    res.render("admin/products", {
      products: data,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

const getEditProduct = (req, res, next) => {
  const productId = req.params.id;
  res.render("admin/add-edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
  });
};

module.exports = { getAddProduct, postAddProduct, getProducts, getEditProduct };
