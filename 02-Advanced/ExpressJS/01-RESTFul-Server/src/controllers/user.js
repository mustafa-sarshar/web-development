const { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file"),
  User = require("../models/users");

exports.getUserStatus = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      const err = new Error("No user found!");
      err.statusCode = httpStatus.notFound.code;
      throw err;
    }

    res.status(httpStatus.success.code).json({
      message: "User status fetched successfully!",
      result: { userStatus: user.status },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const { status } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("No user found!");
      err.statusCode = httpStatus.notFound.code;
      throw err;
    }

    user.status = status;
    const userUpdate = await user.save();

    res.status(httpStatus.success.code).json({
      message: "User status updated successfully!",
      result: { userStatus: userUpdate.status },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatus.systemFailure.code;
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
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

  try {
    const post = await Post.findById(postId);
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
      imageUrlOld = post.imageUrl;
      post.imageUrl = imageUrl;
    }

    const postUpdate = await post.save();
    deleteFile(imageUrlOld);

    res.status(httpStatus.success.code).json({
      message: "Post updated successfully!",
      results: { postId: postUpdate._id },
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

exports.deleteUser = async (req, res, next) => {};
