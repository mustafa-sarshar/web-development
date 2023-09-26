const router = require("express").Router(),
  {
    getUserStatus,
    updateUserStatus,
    updateUser,
    deleteUser,
  } = require("../controllers/user"),
  {
    updateUserValidation,
    updateUserStatusValidation,
  } = require("../utility/validator"),
  checkAuth = require("../middleware/check-auth");

router
  .route("/status") // ROUTE: /users/status
  .get(checkAuth, getUserStatus) // GET
  .patch(checkAuth, updateUserStatusValidation, updateUserStatus); // PATCH

router
  .route("/:userId") // ROUTE: /users/{userId}
  .patch(checkAuth, updateUserValidation, updateUser) // PUT
  .delete(checkAuth, deleteUser); // DELETE

module.exports = router;
