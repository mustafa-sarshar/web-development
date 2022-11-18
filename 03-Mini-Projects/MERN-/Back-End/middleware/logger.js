const
    fs = require("fs"),
    fsPromises = require("fs").promises,
    path = require("path"),
    { format } = require("date-fns"),
    { v4: uuidV4 } = require("uuid");

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuidV4()}\t${message}\n`;
    const dirPath = path.join(__dirname, "..", "logs");
    try {
        if (!fs.existsSync(dirPath))
            await fsPromises.mkdir(dirPath);
        await fsPromises.appendFile(path.join(dirPath, logName + ".log"), logItem);
    } catch (err) {
        console.log(er.message);
    }
}

const logger = (req, res, next) => {
    const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(logMessage, "reqLog");
    console.log(logMessage);
    next();
}

module.exports = { logEvents, logger };
