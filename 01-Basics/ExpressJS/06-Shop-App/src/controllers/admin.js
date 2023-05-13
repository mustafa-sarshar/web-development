const Product = require("../models/products"),
  { validationResult } = require("express-validator"),
  {
    renderParamsCommon,
    renderParamsAdminAddProducts,
    renderParamsAdminProducts,
    renderParamsAdminEditProduct,
  } = require("../constants/renderParams");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    ...renderParamsAdminAddProducts,
    ...renderParamsCommon,
  });
};

const postAddProduct = (req, res, next) => {
  const validationErrors = validationResult(req);
  const { title, price, imageUrl, description } = req.body;

  if (!validationErrors.isEmpty()) {
    return res
      .status(422) // validation error
      .render("admin/add-product", {
        ...renderParamsAdminAddProducts,
        ...renderParamsCommon,
        validationErrors: validationErrors.array(),
        oldInputs: {
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
        },
      });
  }

  const product = new Product({
    title: title,
    price: +price,
    imageUrl: imageUrl,
    description: description,
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
  Product.find({ user: req.user._id })
    // .select("title price -_id")
    // .populate("userId", "username -_id")
    .then((products) => {
      res.render("admin/products", {
        ...renderParamsAdminProducts,
        ...renderParamsCommon,
        products: products,
      });
    })
    .catch((error) => {
      req.flash("errorMessage", "Something went wrong!");
      res.redirect("/admin/products");
      console.error(error);
    });
};

const getEditProduct = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((data) => {
      if (!data) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        ...renderParamsAdminEditProduct,
        ...renderParamsCommon,
        product: data,
      });
    })
    .catch((error) => {
      req.flash("errorMessage", "Something went wrong!");
      res.redirect("/admin/products");
      console.error(error);
    });
};

const postEditProduct = (req, res, next) => {
  const validationErrors = validationResult(req);
  const { productId, title, price, imageUrl, description } = req.body;

  if (!validationErrors.isEmpty()) {
    return res
      .status(422) // validation error
      .render("admin/edit-product", {
        ...renderParamsAdminEditProduct,
        ...renderParamsCommon,
        validationErrors: validationErrors.array(),
        product: {
          _id: productId,
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
        },
      });
  }

  Product.findOne({ _id: productId, user: req.user._id })
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }

      product.title = title.trim();
      product.price = +price;
      product.description = description.trim();
      product.imageUrl = imageUrl.trim();

      return product
        .save()
        .then((result) => {
          res.redirect("/admin/products");
        })
        .catch((error) => {
          req.flash("errorMessage", "Something went wrong!");
          res.redirect("/admin/products");
          console.error(error);
        });
    })
    .catch((error) => {
      req.flash("errorMessage", "Something went wrong!");
      res.redirect("/admin/products");
      console.error(error);
    });
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  Product.deleteOne({ _id: id, user: req.user._id })
    .then((results) => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      req.flash("errorMessage", "Something went wrong!");
      res.redirect("/admin/products");
      console.error(error);
    });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
