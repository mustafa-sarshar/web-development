const Product = require("../models/products");
const Cart = require("../models/carts");

const getIndex = (req, res, next) => {
  Product.fetchAll((data) => {
    // console.log("DATA saved (@/shop/index):", data);
    res.render("shop/index", {
      products: data,
      pageTitle: "My Shops",
      path: "/shop/index",
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll((data) => {
    // console.log("DATA saved (@/shop/products):", data);
    res.render("shop/products", {
      products: data,
      pageTitle: "My Shops",
      path: "/shop/products",
    });
  });
};

const getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (data) => {
    // console.log("Product found:", data);

    res.render("shop/product-details", {
      product: data,
      pageTitle: "My Shops - " + data.title,
      path: "/shop/product-details",
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "My Cart",
    path: "/shop/cart",
  });
};

const postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  console.log(productId);
  res.render("shop/cart", {
    pageTitle: "My Cart",
    path: "/shop/cart",
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "My Orders",
    path: "/shop/orders",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/shop/checkout",
  });
};

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  getOrders,
  getCheckout,
};
