const Product = require("../models/products");

const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/index", {
        products: data,
        pageTitle: "My Shops",
        path: "/shop/index",
      });
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/products", {
        products: data,
        pageTitle: "My Shops",
        path: "/shop/products",
      });
    })
    .catch((error) => console.error(error));
};

const getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((data) => {
      res.render("shop/product-details", {
        product: data,
        pageTitle: "My Shops - " + data.title,
        path: "/shop/product-details",
      });
    })
    .catch((error) => console.error(error));
};

const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartItems) => {
      res.render("shop/cart", {
        cartItems: cartItems,
        pageTitle: "My Cart",
        path: "/shop/cart",
      });
    })
    .catch((error) => console.error(error));
};

const postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const postCartItemDelete = (req, res, next) => {
  const { cartItemId } = req.body;

  req.user
    .deleteItemFromCart(cartItemId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "My Orders",
        path: "/shop/orders",
        orders: orders,
      });
    })
    .catch((error) => console.error(error));
};

const postOrderCreate = (req, res, next) => {
  let cartFetched;

  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

const postOrderItemDelete = (req, res, next) => {
  const { orderId } = req.body;

  req.user
    .deleteOrderItem(orderId)
    .then((results) => {
      res.redirect("/orders");
    })
    .catch((error) => console.error(error));
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
  postCartItemDelete,
  getOrders,
  postOrderCreate,
  postOrderItemDelete,
  getCheckout,
};
