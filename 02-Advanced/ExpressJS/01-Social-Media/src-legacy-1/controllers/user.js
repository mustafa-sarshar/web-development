const { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file"),
  User = require("../models/users");

exports.getUserStatus = (req, res, next) => {
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("No user found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      res.status(httpStatus.success.code).json({
        message: "User status fetched successfully!",
        result: { userStatus: user.status },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const { status } = req.body;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("No user found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      user.status = status;
      return user.save();
    })
    .then((user) => {
      res.status(httpStatus.success.code).json({
        message: "User status updated successfully!",
        result: { userStatus: user.status },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = httpStatus.systemFailure.code;
      }
      next(error);
    });
};

exports.updateUser = (req, res, next) => {
  const validationErrors = validationResult(req);
  let { title, content, imageUrl } = req.body;
  const { postId } = req.params;
  const image = req.file;
  let imageUrlOld = "";

  if (!validationErrors.isEmpty()) {
    const err = new Error("Validation failed!");
    err.statusCode = httpStatus.validationFailed.code;
    err.errorData = validationErrors.array();
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
        throw err;
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
    .then((result) => {
      deleteFile(imageUrlOld);
      res.status(httpStatus.success.code).json({
        message: "Post updated successfully!",
        results: [result],
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

exports.deleteUser = (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("No post found!");
        err.statusCode = httpStatus.notFound.code;
        throw err;
      }

      if (!post.author.name === "Musto") {
        const err = new Error("Not Authenticated!");
        err.statusCode = httpStatus.unauthorized.code;
        throw err;
      }

      deleteFile(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((post) => {
      res.status(httpStatus.success.code).json({
        message: "The post deleted successfully!",
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
