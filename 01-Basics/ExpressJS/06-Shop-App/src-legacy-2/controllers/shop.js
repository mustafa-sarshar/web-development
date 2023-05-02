const Product = require("../models/products");
const Cart = require("../models/carts");

const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      // console.log("DATA saved (@/shop/index):", data);
      res.render("shop/index", {
        products: rows,
        pageTitle: "My Shops",
        path: "/shop/index",
      });
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      // console.log("DATA saved (@/shop/products):", data);
      res.render("shop/products", {
        products: rows,
        pageTitle: "My Shops",
        path: "/shop/products",
      });
    })
    .catch((error) => console.error(error));
};

const getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then(([rows, fieldData]) => {
      res.render("shop/product-details", {
        product: rows[0],
        pageTitle: "My Shops - " + rows[0].title,
        path: "/shop/product-details",
      });
    })
    .catch((error) => console.error(error));
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
