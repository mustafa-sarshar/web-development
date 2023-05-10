const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;

  req.session.user
    .createProduct({
      title: title.trim(),
      price: +price,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    })
    .then((result) => {
      console.log("Product created!", result);
      res.redirect("/admin/products");
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  req.session.user
    .getProducts()
    // Product.findAll()
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

  req.session.user
    .getProducts({ where: { id: id } })
    // Product.findByPk(id)
    .then((data) => {
      res.render("admin/edit-product", {
        product: data[0],
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
      });
    })
    .catch((error) => console.error(error));
};

const postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  console.log("Body", req.body);

  Product.findByPk(productId)
    .then((data) => {
      data.title = title;
      data.price = price;
      data.imageUrl = imageUrl;
      data.description = description;
      return data.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
      console.log("Saved!", result);
    })
    .catch((error) => console.error(error));
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  Product.findByPk(id)
    .then((data) => {
      return data.destroy();
    })
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
