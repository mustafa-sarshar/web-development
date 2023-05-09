const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(
    title,
    price,
    imageUrl,
    description,
    null,
    req.user._id
  );

  product
    .save()
    .then((result) => {
      console.log("Product created!", result);
      res.redirect("/admin/products");
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("admin/products", {
        products: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => console.error(error));
};

const getEditProduct = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((data) => {
      if (!data) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: data,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
      });
    })
    .catch((error) => console.error(error));
};

const postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  const product = new Product(title, price, imageUrl, description, productId);

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
      console.log("Saved!", result);
    })
    .catch((error) => console.error(error));
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  Product.deleteById(id)
    .then((results) => {
      res.redirect("/admin/products");
      console.log("DELETED!", results);
    })
    .catch((error) => console.error(error));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
