const path = require("path");
const pathRoot = path.dirname(require.main.filename);
const pathDataProducts = path.join(pathRoot, "data", "products.json");
const pathDataCart = path.join(pathRoot, "data", "cart.json");

module.exports = { pathRoot, pathDataProducts, pathDataCart };
