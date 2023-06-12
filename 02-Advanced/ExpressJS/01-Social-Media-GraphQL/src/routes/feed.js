const router = require("express").Router(),
  {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
  } = require("../controllers/feed"),
  {
    createPostValidation,
    updatePostValidation,
  } = require("../utility/validator"),
  checkAuth = require("../middleware/check-auth");

router
  .route("/posts/:postId") // ROUTE: /feed/posts/{postId}
  .get(checkAuth, getPost) // GET
  .put(checkAuth, updatePostValidation, updatePost) // PUT
  .delete(checkAuth, deletePost); // DELETE

router
  .route("/posts") // ROUTE: /feed/posts
  .get(checkAuth, getPosts); // GET

router
  .route("/post") // ROUTE: /feed/post
  .post(checkAuth, createPostValidation, createPost); // POST

module.exports = router;
