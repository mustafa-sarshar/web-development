const
    router = require("express").Router(),
    { verifyJwt } = require("../../middleware/verifyJwt");
const { getAllEmployees, addNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require("../../controllers/employees");

router.route("/")
    .get(verifyJwt, getAllEmployees)
    .post(verifyJwt, addNewEmployee)
    .put(verifyJwt, updateEmployee)
    .delete(verifyJwt, deleteEmployee);

router.route("/:id")
    .get(getEmployee);

module.exports = router;