const fs = require("fs"),
  { pathDataCart } = require("../utility/paths");

class Cart {
  static addProduct(productId, productPrice) {
    // Fetch the previous cart
    fs.readFile(pathDataCart, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart, find the existing product
      const productFoundIndex = cart.products.findIndex((product) => {
        return product.id === productId;
      });
      const productFound = cart.products[productFoundIndex];
      let productUpdate;

      // Add the new product, increase the quantity
      if (productFound) {
        productUpdate = { ...productFound };
        productUpdate.qty = productUpdate.qty + 1;
        cart.products = [...cart.products];
        cart.products[productFoundIndex] = productUpdate;
      } else {
        productUpdate = { id: productId, qty: 1 };
        cart.products = [...cart.products, productUpdate];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      // Write the updated data to the file
      fs.writeFile(pathDataCart, JSON.stringify(cart), (error) => {
        console.error(error);
      });
    });
  }
}

module.exports = Cart;
