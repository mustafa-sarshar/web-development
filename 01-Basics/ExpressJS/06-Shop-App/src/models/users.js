const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    console.log("ITEM", item);
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

//   deleteItemFromCart(cartItemId) {
//     const db = getDb();
//     const cartItemsUpdated = this.cart.items.filter((cartItem) => {
//       return cartItem.productId.toString() !== cartItemId.toString();
//     });

//     return db
//       .collection(COLLECTION_NAME)
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: cartItemsUpdated } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             username: this.username,
//           },
//         };

//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };

//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   deleteOrderItem(orderId) {
//     const db = getDb();

//     return this.getOrders()
//       .then((orders) => {
//         console.log("ORDERS:", orders);
//         console.log("ORDER ID", orderId);
//         return db
//           .collection("orders")
//           .deleteOne({ _id: new mongodb.ObjectId(orderId) });
//       })
//       .then((order) => {
//         return order;
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db
//       .collection(COLLECTION_NAME)
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((error) => console.error(error));
//   }
// }

module.exports = mongoose.model("User", userSchema);
