const express = require("express");
const router = express.Router();

router
    .route("/person")
    .get((req, res) => {
        if (req.query.name)
            res.send(`You have requested ${req.query.name}.`);
        else
            res.send("You have requested a person.");
    });

router
    .route("/person/:name")
    .get((req, res) => {
        res.send(`You have requested ${req.params.name}.`);
    });

module.exports = router;