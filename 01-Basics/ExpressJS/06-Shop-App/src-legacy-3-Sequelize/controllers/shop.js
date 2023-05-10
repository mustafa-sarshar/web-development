const Product = require("../models/products");

const getIndex = (req, res, next) => {
  Product.findAll()
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
  Product.findAll()
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
  Product.findByPk(productId)
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
  req.session.user
    .getCart()
    .then((cart) => {
      console.log("Cart", cart.dataValues);
      return cart.getProducts();
    })
    .then((products) => {
      console.log("Products", products.length);

      res.render("shop/cart", {
        products: products,
        pageTitle: "My Cart",
        path: "/shop/cart",
      });
    })
    .catch((error) => console.error(error));
};

const postCart = (req, res, next) => {
  const { productId } = req.body;
  let cartFetched;
  let quantityNew = 1;

  req.session.user
    .getCart()
    .then((cart) => {
      console.log("Cart", cart.dataValues);
      cartFetched = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const quantityOld = product.cartItem.quantity;
        quantityNew = quantityOld + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return cartFetched.addProduct(product, {
        through: { quantity: quantityNew },
      });
    })
    .then((results) => {
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const postCartItemDelete = (req, res, next) => {
  const { productId } = req.body;
  req.session.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => console.error(error));
};

const getOrders = (req, res, next) => {
  req.session.user
    .getOrders({ include: ["products"] })
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

  req.session.user
    .getCart()
    .then((cart) => {
      cartFetched = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.session.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((error) => console.error(error));
    })
    .then((results) => {
      return cartFetched.setProducts(null);
    })
    .then((results) => {
      res.redirect("/orders");
    })
    .catch((error) => console.error(error));
};

const postOrderItemDelete = (req, res, next) => {
  const { orderId } = req.body;

  req.session.user
    .getOrders({ where: { id: orderId } })
    .then((orderItems) => {
      const orderItem = orderItems[0];
      return orderItem.destroy();
    })
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
