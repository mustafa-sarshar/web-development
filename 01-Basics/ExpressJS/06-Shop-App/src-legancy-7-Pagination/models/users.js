const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpirationDate: {
    type: Date,
    required: false,
  },
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let quantityNew = 1;
  const cartItemsUpdated = [...this.cart.items];
  const cartItemFoundIndex = this.cart.items.findIndex((item) => {
    return item.product.toString() === product._id.toString();
  });

  if (cartItemFoundIndex > -1) {
    quantityNew = this.cart.items[cartItemFoundIndex].quantity + 1;
    cartItemsUpdated[cartItemFoundIndex].quantity = quantityNew;
  } else {
    cartItemsUpdated.push({
      product: product._id,
      quantity: quantityNew,
    });
  }

  const cartUpdated = {
    items: cartItemsUpdated,
  };
  this.cart = cartUpdated;

  return this.save()
    .then((user) => {
      return user;
    })
    .catch((error) => console.error(error));
};

userSchema.methods.deleteCartItem = function (cartItemId) {
  const cartItemsUpdated = this.cart.items.filter((cartItem) => {
    return cartItem.product.toString() !== cartItemId.toString();
  });
  this.cart.items = cartItemsUpdated;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
