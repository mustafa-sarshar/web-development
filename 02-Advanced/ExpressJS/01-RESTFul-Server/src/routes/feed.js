const router = require("express").Router(),
  {
    getPost,
    getPosts,
    createPost,
    updatePost,
  } = require("../controllers/feed"),
  {
    createPostValidation,
    updatePostValidation,
  } = require("../utility/validator");

router
  .route("/posts/:postId") // ROUTE: /feed/posts/{postId}
  .get(getPost) // GET
  .put(updatePostValidation, updatePost); // PUT

router
  .route("/posts") // ROUTE: /feed/posts
  .get(getPosts); // GET

router
  .route("/post") // ROUTE: /feed/post
  .post(createPostValidation, createPost); // POST

module.exports = router;
