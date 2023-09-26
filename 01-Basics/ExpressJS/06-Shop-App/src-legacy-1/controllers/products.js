const products = [];

const addProductGet = (req, res, next) => {
  // res.sendFile(path.join(pathRoot, "views", "add-product.html")); // for normal .html template
  // res.render("add-product", {
  //   pageTitle: "Add Product",
  //   path: "add-product",
  // }); // for .pug template
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "add-product",
    activeAddProduct: true,
  }); // for .handlebars template
};

const addProductPost = (req, res, next) => {
  const dataSubmitted = req.body;
  console.log(dataSubmitted);
  products.push(dataSubmitted);
  res.redirect("/");
};

const getProductsGet = (req, res, next) => {
  console.log("DATA saved:", products);
  // res.sendFile(path.join(pathRoot, "views", "shop.html")); // for normal .html template
  // res.render("shop", { products, pageTitle: "My Shops", path: "shop" }); // for .pug template
  res.render("shop", {
    products,
    hasProducts: products.length > 0,
    pageTitle: "My Shops",
    path: "shop",
    activeShop: true,
  }); // for .handlebars template
};

module.exports = { products, addProductGet, addProductPost, getProductsGet };
