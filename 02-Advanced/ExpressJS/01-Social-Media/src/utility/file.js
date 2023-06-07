const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    fs.unlink(filePath, (error) => {
      if (error) {
        throw error;
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteFile };
