const router = require("express").Router(),
    path = require("path");

router.route("^/$|index(.html)?").get((req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
