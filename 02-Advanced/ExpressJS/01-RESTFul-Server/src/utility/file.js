const fs = require("fs");

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (error) => {
      if (error) {
        throw error;
      }
    });
  } else {
    // throw new Error("No such a file exists!");
    console.error("No such a file exists!");
  }
};

module.exports = { deleteFile };
