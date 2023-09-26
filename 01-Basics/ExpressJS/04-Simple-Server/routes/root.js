const router = require("express").Router(),
  path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new_page(.html)?", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "views", "new_page.html"));
});

router.get("/old_page(.html)?", (req, res) => {
  res.redirect(301, "/new_page.html");
});

module.exports = router;
