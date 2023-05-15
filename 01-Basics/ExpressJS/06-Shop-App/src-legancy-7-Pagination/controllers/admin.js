const mongoose = require("mongoose");
const Product = require("../models/products"),
  { validationResult } = require("express-validator"),
  { deleteFile } = require("../utility/file"),
  {
    renderParamsCommon,
    renderParamsAdminAddProducts,
    renderParamsAdminProducts,
    renderParamsAdminEditProduct,
  } = require("../constants/renderParams"),
  { ITEMS_PER_PAGE } = require("../constants/pagination");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    ...renderParamsAdminAddProducts,
    ...renderParamsCommon,
  });
};

const postAddProduct = (req, res, next) => {
  const validationErrors = validationResult(req);
  const { title, price, description } = req.body;
  const image = req.file;

  if (!image) {
    return res
      .status(422) // validation error
      .render("admin/add-product", {
        ...renderParamsAdminAddProducts,
        ...renderParamsCommon,
        errorMessage: ["Attached file is not an image!"],
        oldInputs: {
          title: title,
          price: price,
          description: description,
        },
      });
  }

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
          description: description,
        },
      });
  }

  const imageUrl = image.path;
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
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.count({ user: req.user._id })
    .then((numProducts) => {
      totalItems = numProducts;

      return (
        Product.find({ user: req.user._id })
          // .select("title price -_id")
          // .populate("userId", "username -_id")
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE)
      );
    })
    .then((products) => {
      res.render("admin/products", {
        ...renderParamsAdminProducts,
        ...renderParamsCommon,
        products: products,
        pagination: {
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPrevPage: page > 1,
          curPage: page,
          nextPage: page + 1,
          prevPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        },
      });
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
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
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const postEditProduct = (req, res, next) => {
  const validationErrors = validationResult(req);
  const { productId, title, price, description } = req.body;
  const image = req.file;

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
          description: description,
        },
      });
  }

  Product.findOne({ _id: productId, user: req.user._id })
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }

      product.title = title;
      product.price = +price;
      product.description = description;

      if (image) {
        deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }

      return product
        .save()
        .then((result) => {
          res.redirect("/admin/products");
        })
        .catch((error) => {
          console.error(error);
          const err = new Error(error);
          err.httpStatusCode = 500;
          return next(err);
        });
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const err = new Error("No product found");
        err.httpStatusCode = 500;
        return next(err);
      } else {
        deleteFile(product.imageUrl);
        return Product.deleteOne({ _id: productId, user: req.user._id });
      }
    })
    .then((results) => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
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
