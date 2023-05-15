const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = { deleteFile };
