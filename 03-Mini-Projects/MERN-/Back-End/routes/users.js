// Import Libs
const router = require("express").Router(),
    path = require("path");

//  Import Objects
const {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
} = require("../controllers/users");

router
    .route("/")
    .get(getAllUsers)
    .post(addUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
