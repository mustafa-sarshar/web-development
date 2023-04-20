const fs = require("fs"),
  { pathData } = require("../utility/paths");
const { stringify } = require("querystring");

const products = [];

class Product {
  constructor(title) {
    this.title = title;
  }

  static establishDatabase() {
    fs.writeFile(pathData, JSON.stringify([]), (error) => {
      console.error(error);
    });
  }

  save() {
    fs.readFile(pathData, (error, data) => {
      let products = [];
      if (!error) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(pathData, JSON.stringify(products), (error) => {
        console.error(error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(pathData, (error, data) => {
      let products = [];
      if (!error) {
        callback(JSON.parse(data));
      } else {
        callback(products.slice());
      }
    });
  }
}

module.exports = Product;
