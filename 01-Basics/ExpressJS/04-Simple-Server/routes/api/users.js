const router = require("express").Router();
const { getAllUsers, addNewUser, updateUser, deleteUser, getUser } = require("../../controllers/users");

router.route("/")
    .get(getAllUsers)
    .post(addNewUser)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:id")
    .get(getUser);

module.exports = router;