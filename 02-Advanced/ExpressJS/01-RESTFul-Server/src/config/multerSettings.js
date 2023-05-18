const multer = require("multer");

const acceptedMimeTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/svg+xml",
];

exports.multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/data/images");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + "_" + file.originalname);
  },
});

exports.multerFileFilter = (req, file, callback) => {
  if (acceptedMimeTypes.indexOf(file.mimetype) > -2) {
    callback(null, true); // accept
  } else {
    callback(null, false); // reject
  }
};
