// Import Libs
const asyncHandler = require("express-async-handler");

// Models
const { User: Users } = require("../models/User.js"),
    { Post: Posts } = require("../models/Post.js");

//  @desc       Get all Posts
//  @route      GET /posts
//  @access     Private
const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Posts.find().select("-password").lean();
    if (!posts?.length) {
        return res.status(400).json({ message: "No Posts Found" });
    }
    res.status(200).json(posts);
});

//  @desc       Add a Post
//  @route      POST /posts
//  @access     Private
const addPost = asyncHandler(async (req, res, next) => {
    const { user_id, title, text } = req.body;

    if (!user_id || !title || !text) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const author = await Users.findById(user_id).select("-password").exec();
    if (!author) {
        res.status(400).json({ message: "Author Not Found" });
    }

    const duplicate = await Posts.findOne({ title }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Title" });
    }

    const newPost = await Posts.create({
        user_id,
        title,
        text,
    });

    if (newPost) {
        res.status(201).json({
            message: `User (${author.username}) Posted ${title} Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

//  @desc       Update a User
//  @route      PATCH       /users
//  @access     Private
const updatePost = asyncHandler(async (req, res, next) => {
    const { _id, user_id, title, text, completed } = req.body;

    if (!_id || !user_id || !title) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const author = await Users.findById(user_id).select("-password").exec();
    if (!author) {
        res.status(400).json({ message: "Author Not Found" });
    }

    const post = await Posts.findById(_id).exec();
    if (!post) {
        return res.status(400).json({ message: "Post Not Found" });
    }

    // Update values
    if (text) {
        post.text = text;
    }
    if (completed) {
        post.completed = completed;
    }

    const postUpdate = await post.save();

    if (postUpdate) {
        res.status(201).json({
            message: `User (${author.username}) Updated the Post ${title} Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

//  @desc       Delete a User
//  @route      DELETE       /users
//  @access     Private
const deletePost = asyncHandler(async (req, res, next) => {
    const { _id } = req.body;
    if (!_id) {
        res.status(400).json({ message: "ID Is Required" });
    }

    const post = await Posts.findById(_id).exec();
    if (!post) {
        res.status(400).json({ message: "Post Not Found" });
    }

    const postDeleted = await post.deleteOne();
    console.log("Deleted Post:", postDeleted);
    if (postDeleted) {
        res.status(201).json({
            message: `Post (${post.title}) Deleted Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

module.exports = { getAllPosts, addPost, updatePost, deletePost };
