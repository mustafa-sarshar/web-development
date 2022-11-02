const fs = require("fs");
const path = require("path");

fs.readFile(
    path.join(__dirname, "files", "my_text.txt"),
    "utf-8",
    (err, data) => {
        if (err) throw err;
        console.log(data);
    });

let textToSave = "This text will be saved.";
fs.writeFile(
    path.join(__dirname, "files", "your_text.txt"),
    textToSave,
    (err) => {
        if (err) throw err;
        console.log("Data saved!");
    });

let textToAppend = "This text will be appended @" + Date().toString() + ".";
fs.appendFile(
    path.join(__dirname, "files", "append_text.txt"),
    textToAppend,
    (err) => {
        if (err) throw err;
        console.log("Data appended!");
    });

// Use fs module method synchronously - Method 1

const filename = "my_text_to_rename_1.txt"
fs.writeFile(
    path.join(__dirname, "files", filename),
    textToSave,
    (err) => {
        if (err) throw err;
        console.log("00-Data saved to ", filename);

        fs.readFile(
            path.join(__dirname, "files", filename),
            "utf-8",
            (err, data) => {
                if (err) throw err;
                console.log("01-ReadFile:", data);

                fs.appendFile(
                    path.join(__dirname, "files", filename),
                    "A new text to append.",
                    (err) => {
                        if (err) throw err;
                        console.log("02-AppendFile: successful.");

                        fs.rename(
                            path.join(__dirname, "files", filename),
                            path.join(__dirname, "files", path.basename(filename) + "_renamed.txt"),
                            (err) => {
                                if (err) throw err;
                                console.log("03-Rename: file name changed successfully.");

                                fs.readFile(
                                    path.join(__dirname, "files", path.basename(filename) + "_renamed.txt"),
                                    "utf-8",
                                    (err, data) => {
                                        if (err) throw err;
                                        console.log("04-ReadFile:", data);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);



// Use fs module method synchronously - Method 2
const fsPromises = require("fs").promises;
const filename2 = "my_text_to_rename_2.txt"
const operationSeries = async () => {
    try {
        await fsPromises.writeFile(
            path.join(__dirname, "files", filename2),
            "Text to write to the file"
        );
        console.log("00-WriteFile: successful.");
        let data = await fsPromises.readFile(
            path.join(__dirname, "files", filename2),
            "utf-8"
        );
        console.log("01-ReadFile: ", data);
        await fsPromises.appendFile(
            path.join(__dirname, "files", filename2),
            "Thi text wll be appended to the file."
        );
        console.log("02-AppendFile: successful");
        await fsPromises.rename(
            path.join(__dirname, "files", filename2),
            path.join(__dirname, "files", path.basename(filename2) + "_renamed.txt")
        );
        console.log("03-Rename: file name changed successfully.");
        data = await fsPromises.readFile(
            path.join(__dirname, "files", path.basename(filename2) + "_renamed.txt"),
            "utf-8"
        );
        console.log("04-ReadFile: ", data);

    } catch (err) {
        console.error(err);
    }
}
operationSeries();

// Delete a file
fs.unlink(
    path.join(__dirname, "files", "fake_file.txt"),
    (err) => {
        if (err) console.error(err.message);
    }
);


// Use stream methods for working with large files
const rs = fs.createReadStream(
    path.join(__dirname, "files", "lorem_large.txt"),
    "utf-8"
);
const ws = fs.createWriteStream(path.join(__dirname, "files", "lorem_large_copy.txt"));

// Copy the rs to ws
rs.on("data", (dataChunk) => {
    ws.write(dataChunk);
});

// 
// rs.pipe(ws);

// Use methods for directory
const dirPath = path.join(__dirname, "files", "temp-dir");
if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err) => {
        if (err) throw err.message;
        console.log("Directory made.", dirPath);
    })
} else {
    fs.rmdir(dirPath, (err) => {
        if (err) throw err.message;
        console.log("Directory removed.", dirPath);
    })
}