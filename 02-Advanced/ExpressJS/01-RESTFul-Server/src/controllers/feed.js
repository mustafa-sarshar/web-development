const path = require("path"),
  { validationResult } = require("express-validator"),
  { httpStatus } = require("../constants/httpStatus"),
  { deleteFile } = require("../utility/file"),
  Post = require("../models/posts");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(httpStatus.success.code).json({
        message: "All posts fetched successfully!",
        posts: posts,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      res.status(httpStatus.success.code).json({
        message: "The post fetched successfully!",
        post: post,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.createPost = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();
    throw err;
  }

  const image = req.file;
  if (!image) {
    const err = new Error("No image provided!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();
    throw err;
  }

  const { title, content } = req.body;
  Post({
    title: title,
    content: content,
    imageUrl: image.path,
    author: {
      name: "Musto",
    },
  })
    .save()
    .then((result) => {
      res.status(httpStatus.successfulCreation.code).json({
        message: "Post created successfully!",
        results: [result],
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();
    throw err;
  }

  let { title, content, imageUrl } = req.body;
  const { postId } = req.params;
  const image = req.file;
  if (image) {
    imageUrl = image.path;
  }
  if (!imageUrl) {
    const err = new Error("No image provided!");
    err.statusCode = httpStatus.validationFailed.code;
    throw err;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      if (imageUrl !== post.imageUrl) {
        const imagePath = path.join(__dirname, "..", "..", post.imageUrl);
        deleteFile(imagePath);
      }

      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(httpStatus.success.code).json({
        message: "Post updated successfully!",
        results: [result],
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;

  Post.deleteOne(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      res.status(httpStatus.success.code).json({
        message: "The post fetched successfully!",
        post: post,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};
