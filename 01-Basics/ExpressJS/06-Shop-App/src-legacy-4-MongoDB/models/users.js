const mongodb = require("mongodb");
const { getDb } = require("../utility/database");

const COLLECTION_NAME = "users";

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOps;

    if (this._id) {
      dbOps = db.collection(COLLECTION_NAME).updateOne(
        { _id: this._id },
        {
          $set: this,
        }
      );
    } else {
      dbOps = db.collection(COLLECTION_NAME).insertOne(this);
    }

    return dbOps
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCart() {
    const db = getDb();
    const productsIds = this.cart.items.map((cartItem) => {
      return cartItem.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productsIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find((cartItem) => {
              return cartItem.productId.toString() === product._id.toString();
            }).quantity,
          };
        });
      })
      .catch((error) => console.error(error));
  }

  addToCart(product) {
    const db = getDb();
    let quantityNew = 1;
    const cartItemsUpdated = [...this.cart.items];
    const cartItemFoundIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id.toString();
    });

    if (cartItemFoundIndex > -1) {
      quantityNew = this.cart.items[cartItemFoundIndex].quantity + 1;
      cartItemsUpdated[cartItemFoundIndex].quantity = quantityNew;
    } else {
      cartItemsUpdated.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: quantityNew,
      });
    }

    const cartUpdated = {
      items: cartItemsUpdated,
    };

    return db
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: new mongodb.ObjectId(this._id),
        },
        {
          $set: { cart: cartUpdated },
        }
      )
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => console.error(error));
  }

  deleteItemFromCart(cartItemId) {
    const db = getDb();
    const cartItemsUpdated = this.cart.items.filter((cartItem) => {
      return cartItem.productId.toString() !== cartItemId.toString();
    });

    return db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: cartItemsUpdated } } }
      );
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new mongodb.ObjectId(this._id),
            username: this.username,
          },
        };

        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };

        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();

    return db
      .collection("orders")
      .find({ "user._id": new mongodb.ObjectId(this._id) })
      .toArray();
  }

  deleteOrderItem(orderId) {
    const db = getDb();

    return this.getOrders()
      .then((orders) => {
        console.log("ORDERS:", orders);
        console.log("ORDER ID", orderId);
        return db
          .collection("orders")
          .deleteOne({ _id: new mongodb.ObjectId(orderId) });
      })
      .then((order) => {
        return order;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => console.error(error));
  }
}

module.exports = User;
