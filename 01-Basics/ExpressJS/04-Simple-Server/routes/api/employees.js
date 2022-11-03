const router = require("express").Router();

const data = {};
data.employees = require("../../data/employees.json");

router.route("/")
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "first_name": req.body.first_name,
            "last_name": req.body.last_name
        });
    })
    .put((req, res) => {
        res.json({
            "first_name": req.body.first_name,
            "last_name": req.body.last_name
        });
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        });
    });

router.route("/:id")
    .get((req, res) => {
        res.json({
            "id": req.params.id
        });
    });

module.exports = router;