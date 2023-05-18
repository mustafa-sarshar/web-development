const router = require("express").Router(),
  { getPost, getPosts, createPost } = require("../controllers/feed"),
  { createPostValidation } = require("../utility/validator");

router
  .route("/posts/:postId") // ROUTE: /feed/posts/{postId}
  .get(getPost); // GET

router
  .route("/posts") // ROUTE: /feed/posts
  .get(getPosts); // GET

router
  .route("/post") // ROUTE: /feed/post
  .post(createPostValidation, createPost); // POST

module.exports = router;
