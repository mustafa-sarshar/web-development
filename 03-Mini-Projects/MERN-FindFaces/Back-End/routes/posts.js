// Import Libs
const router = require("express").Router(),
    path = require("path");

//  Import Objects
const {
    getAllPosts,
    addPost,
    updatePost,
    deletePost,
} = require("../controllers/posts");

router
    .route("/")
    .get(getAllPosts)
    .post(addPost)
    .patch(updatePost)
    .delete(deletePost);

module.exports = router;
