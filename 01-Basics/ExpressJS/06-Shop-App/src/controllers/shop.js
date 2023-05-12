const Product = require("../models/products"),
  User = require("../models/users"),
  Order = require("../models/orders"),
  {
    renderParamsCommon,
    renderParamsIndex,
    renderParamsProducts,
    renderParamsCheckout,
    renderParamsOrders,
    renderParamsCart,
    renderParamsDetails,
  } = require("../constants/renderParams");

const getIndex = (req, res, next) => {
  Product.find()
    .then((data) => {
      res.render("shop/index", {
        ...renderParamsIndex,
        ...renderParamsCommon,
        products: data,
      });
    })
    .catch((error) => console.error(error));
};

const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/products", {
        ...renderParamsProducts,
        ...renderParamsCommon,
        products: products,
      });
    })
    .catch((error) => console.error(error));
};

const getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-details", {
        ...renderParamsDetails,
        ...renderParamsCommon,
        pageTitle: "My Shops - " + product.title,
        product: product,
      });
    })
    .catch((error) => console.error(error));
};

const getCart = (req, res, next) => {
  req.user
    .populate({
      path: "cart.items.product",
      select: "",
    })
    .then((user) => {
      const cartItems = user.cart.items;
      res.render("shop/cart", {
        ...renderParamsCart,
        ...renderParamsCommon,
        cartItems: cartItems,
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
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const postCartItemDelete = (req, res, next) => {
  const { cartItemId } = req.body;

  req.user
    .deleteCartItem(cartItemId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        ...renderParamsOrders,
        ...renderParamsCommon,
        orders: orders,
      });
    })
    .catch((error) => console.error(error));
};

const postOrderCreate = (req, res, next) => {
  req.user
    .populate({
      path: "cart.items.product",
      select: "",
    })
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.product._doc } };
      });

      const order = new Order({
        user: {
          userId: req.user._id,
          email: req.user.email,
        },
        products: products,
      });

      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((error) => console.error(error));
};

const postOrderItemDelete = (req, res, next) => {
  const { orderId } = req.body;

  Order.deleteOne({ _id: orderId })
    .then((results) => {
      res.redirect("/orders");
    })
    .catch((error) => console.error(error));
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    ...renderParamsCheckout,
    ...renderParamsCommon,
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
