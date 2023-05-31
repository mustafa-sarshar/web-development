const jwt = require("jsonwebtoken"),
  { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const image = req.file;

  if (!authHeader) {
    const err = new Error("Not Authenticated!");
    err.statusCode = httpStatus.unauthorized.code;

    if (image) {
      deleteFile(image.path);
    }

    throw err;
  }

  const token = authHeader.split(" ")[1];
  let tokenDecoded;

  try {
    tokenDecoded = jwt.verify(token, process.env["JWT_SECRET_KEY"]);
  } catch (error) {
    error.statusCode = httpStatus.systemFailure.code;
    if (image) {
      deleteFile(image.path);
    }

    throw error;
  }

  if (!tokenDecoded) {
    const err = new Error("Authentication Failed!");
    err.statusCode = httpStatus.unauthorized.code;
    if (image) {
      deleteFile(image.path);
    }

    throw err;
  }

  req.userId = tokenDecoded.userId;
  next();
};
