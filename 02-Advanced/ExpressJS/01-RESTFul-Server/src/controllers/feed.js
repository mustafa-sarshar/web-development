const { validationResult } = require("express-validator"),
  { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file"),
  Post = require("../models/posts"),
  User = require("../models/users");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  let numItemsPerPage = req.query.size || 0;
  let numItemsTotal;

  Post.find()
    .countDocuments()
    .then((numPosts) => {
      numItemsTotal = numPosts;
      if (numItemsPerPage === 0) {
        numItemsPerPage = numItemsTotal;
      }
      return Post.find()
        .skip((currentPage - 1) * numItemsPerPage)
        .limit(numItemsPerPage);
    })
    .then((posts) => {
      res.status(httpStatus.success.code).json({
        message: "All posts fetched successfully!",
        result: { posts: posts },
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
        result: { post: post },
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
  const { title, content } = req.body;
  const image = req.file;

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();

    if (image) {
      deleteFile(image.path);
    }

    throw err;
  }

  if (!image) {
    const err = new Error("No image provided!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();
    throw err;
  }

  let author;
  const postNew = new Post({
    title: title,
    content: content,
    imageUrl: image.path,
    author: req.userId,
  });
  postNew
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      author = user;
      user.posts.push(postNew);
      return user.save();
    })
    .then((result) => {
      res.status(httpStatus.successfulCreation.code).json({
        message: "Post created successfully!",
        result: {
          post: postNew,
          author: {
            _id: author._id,
            username: author.username,
          },
        },
      });
    })
    .catch((error) => {
      if (image) {
        deleteFile(image.path);
      }
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const validationErrors = validationResult(req);
  let { title, content, imageUrl } = req.body;
  const { postId } = req.params;
  const image = req.file;
  let imageUrlOld = "";

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();

    if (image) {
      deleteFile(image.path);
    }

    throw err;
  }

  if (image) {
    imageUrl = image.path;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;

        if (image) {
          deleteFile(image.path);
        }

        throw err;
      }

      if (post.author.toString() !== req.userId) {
        const err = new Error("Forbidden!");
        err.statusCode = httpStatus.forbidden.code;

        if (image) {
          deleteFile(image.path);
        }

        throw err;
      }

      if (imageUrl && imageUrl !== post.imageUrl) {
        imageUrlOld = post.imageUrl;
      }

      if (title && title.trim().length > 0) {
        post.title = title;
      }
      if (content && content.trim().length > 0) {
        post.content = content;
      }
      if (image) {
        post.imageUrl = imageUrl;
      }

      return post.save();
    })
    .then((post) => {
      deleteFile(imageUrlOld);
      res.status(httpStatus.success.code).json({
        message: "Post updated successfully!",
        result: { postId: post._id },
      });
    })
    .catch((error) => {
      if (image) {
        deleteFile(image.path);
      }

      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      if (post.author.toString() !== req.userId) {
        const err = new Error("Not Authorized!");
        err.statusCode = httpStatus.unauthorized.code;

        throw err;
      }

      deleteFile(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((post) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then((user) => {
      res.status(httpStatus.success.code).json({
        message: "The post deleted successfully!",
        result: { postId: postId },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};
