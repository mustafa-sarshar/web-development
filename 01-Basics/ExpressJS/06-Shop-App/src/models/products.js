const fs = require("fs"),
  { pathDataProducts } = require("../utility/paths");

const products = [];

const getProductsFromFile = (callback) => {
  fs.readFile(pathDataProducts, (error, fileContent) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = (Math.random() * 100000).toString();

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(pathDataProducts, JSON.stringify(products), (error) => {
        console.error(error);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === id;
      });
      callback(product);
    });
  }
}

module.exports = Product;
