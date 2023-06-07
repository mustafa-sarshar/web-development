const { validationResult } = require("express-validator"),
  { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file"),
  io = require("../socketIO"),
  Post = require("../models/posts"),
  User = require("../models/users");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  let numItemsPerPage = req.query.size || 0;

  try {
    const numItemsTotal = await Post.find().countDocuments();
    if (numItemsPerPage === 0) {
      numItemsPerPage = numItemsTotal;
    }
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "",
      })
      .skip((currentPage - 1) * numItemsPerPage)
      .limit(numItemsPerPage);
    res.status(httpStatus.success.code).json({
      message: "All posts fetched successfully!",
      result: { posts: posts },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const err = new Error("No post found!");
      err.statusCode = httpStatus.notFound.code;
      throw err;
    }

    res.status(httpStatus.success.code).json({
      message: "The post fetched successfully!",
      result: { post: post },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const { title, content } = req.body;
  const image = req.file;

  try {
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
      throw err;
    }

    const postNew = new Post({
      title: title,
      content: content,
      imageUrl: image.path,
      author: req.userId,
    });

    await postNew.save();

    const user = await User.findById(req.userId);
    user.posts.push(postNew);
    await user.save();

    // inform all other users
    io.getIO().emit("POSTS", { action: "CREATE", post: postNew });

    res.status(httpStatus.successfulCreation.code).json({
      message: "Post created successfully!",
      result: {
        post: postNew,
        author: {
          _id: user._id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    if (image) {
      deleteFile(image.path);
    }
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const validationErrors = validationResult(req);
  let { title, content, imageUrl } = req.body;
  const { postId } = req.params;
  const image = req.file;
  let imageUrlOld = "";

  try {
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

    const postUpdate = await Post.findById(postId);
    if (!postUpdate) {
      const err = new Error("No post found!");
      err.statusCode = httpStatus.notFound.code;

      if (image) {
        deleteFile(image.path);
      }

      throw err;
    }

    if (postUpdate.author.toString() !== req.userId) {
      const err = new Error("Forbidden!");
      err.statusCode = httpStatus.forbidden.code;

      if (image) {
        deleteFile(image.path);
      }

      throw err;
    }

    if (imageUrl && imageUrl !== postUpdate.imageUrl) {
      imageUrlOld = postUpdate.imageUrl;
    }

    if (title && title.trim().length > 0) {
      postUpdate.title = title;
    }
    if (content && content.trim().length > 0) {
      postUpdate.content = content;
    }
    if (image) {
      postUpdate.imageUrl = imageUrl;
    }

    await postUpdate.save();
    deleteFile(imageUrlOld);
    res.status(httpStatus.success.code).json({
      message: "Post updated successfully!",
      result: { postId: postUpdate._id },
    });
  } catch (error) {
    if (image) {
      deleteFile(image.path);
    }

    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
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

    await Post.findByIdAndRemove(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(httpStatus.success.code).json({
      message: "The post deleted successfully!",
      result: { postId: postId },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};
