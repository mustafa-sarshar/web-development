const path = require("path"),
  { createPDF } = require("../utility/pdf"),
  Product = require("../models/products"),
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
  } = require("../constants/renderParams"),
  { ITEMS_PER_PAGE } = require("../constants/pagination");

const getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;

      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/index", {
        ...renderParamsIndex,
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

const getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;

      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/products", {
        ...renderParamsProducts,
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

const getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-details", {
        ...renderParamsDetails,
        ...renderParamsCommon,
        pageTitle: "My Shops - " + product.title,
        product: product,
      });
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
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
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
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
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const postCartItemDelete = (req, res, next) => {
  const { cartItemId } = req.body;

  req.user
    .deleteCartItem(cartItemId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
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
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const getInvoice = (req, res, next) => {
  const { invoiceId } = req.params;

  // Check the authentication
  Order.findOne({ _id: invoiceId })
    .then((order) => {
      if (!order) {
        return new Error("No Order Found!");
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return new Error("No Authorized!");
      }

      const invoiceFilename = `invoice_${invoiceId}.pdf`;
      const invoicePath = path.join("src", "data", "invoices", invoiceFilename);

      createPDF(invoiceFilename, invoicePath, order, res);

      // fs.readFile(invoicePath, (error, data) => {
      //   if (error) {
      //     const err = new Error(error);
      //     err.httpStatusCode = 500;
      //     next(err);
      //   } else {
      //     res.set("Content-Type", "application/pdf");
      //     res.set("Content-Disposition", `inline; filename=${invoiceFilename}`);
      //     res.send(data);
      //   }
      // });
      // const fileStream = fs.createReadStream(invoicePath);
      // res.set("Content-Type", "application/pdf");
      // res.set("Content-Disposition", `inline; filename=${invoiceFilename}`);
      // fileStream.pipe(res);
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
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
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
};

const postOrderItemDelete = (req, res, next) => {
  const { orderId } = req.body;

  Order.deleteOne({ _id: orderId })
    .then((results) => {
      res.redirect("/orders");
    })
    .catch((error) => {
      console.error(error);
      const err = new Error(error);
      err.httpStatusCode = 500;
      return next(err);
    });
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
  getInvoice,
  postOrderCreate,
  postOrderItemDelete,
  getCheckout,
};
