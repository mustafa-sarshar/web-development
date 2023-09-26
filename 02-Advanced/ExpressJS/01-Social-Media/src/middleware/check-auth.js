const jwt = require("jsonwebtoken"),
  { httpStatus } = require("../constants/http-status"),
  { deleteFile } = require("../utility/file");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const image = req.file;
  let tokenDecoded;

  try {
    if (!authHeader) {
      const err = new Error("Not Authenticated!");
      err.statusCode = httpStatus.unauthorized.code;

      if (image) {
        deleteFile(image.path);
      }

      throw err;
    }

    const token = authHeader.split(" ")[1];

    tokenDecoded = jwt.verify(token, process.env["JWT_SECRET_KEY"]);

    if (!tokenDecoded) {
      const err = new Error("Authentication Failed!");
      err.statusCode = httpStatus.unauthorized.code;
      if (image) {
        deleteFile(image.path);
      }

      throw err;
    }
  } catch (error) {
    error.statusCode = httpStatus.systemFailure.code;
    if (image) {
      deleteFile(image.path);
    }

    return next(error);
  }

  req.userId = tokenDecoded.userId;
  next();
};
