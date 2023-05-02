const mongodb = require("mongodb");
const { getDb } = require("../utility/database");

const COLLECTION_NAME = "products";

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
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

  static fetchAll() {
    const db = getDb();

    return db
      .collection(COLLECTION_NAME)
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static findById(productId) {
    const db = getDb();

    return db
      .collection(COLLECTION_NAME)
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static deleteById(productId) {
    const db = getDb();

    return db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = Product;
