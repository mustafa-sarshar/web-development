const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isAuthenticated: req.session.isAuthenticated,
  });
};

const postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({
    title: title.trim(),
    price: +price,
    imageUrl: imageUrl.trim(),
    description: description.trim(),
    user: req.user._id,
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "username -_id")
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isAuthenticated,
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
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((error) => console.error(error));
};

const postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  Product.findById(productId)
    .then((product) => {
      product.title = title.trim();
      product.price = +price;
      product.description = description.trim();
      product.imageUrl = imageUrl.trim();

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.error(error));
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then((results) => {
      res.redirect("/admin/products");
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
