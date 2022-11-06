const router = require("express").Router();
const { handleLogin } = require("../controllers/auth");

router.route("/")
    .post(handleLogin);

module.exports = router;