const 
    fs = require("fs"),
    fsPromises = fs.promises,
    path = require("path"),
    { format } = require("date-fns"),
    { v4: uuidV4 } = require("uuid");

const logEvents = async (msg, logName) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuidV4()}\t${msg}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs")))
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", `${ logName }.txt`), logItem);
    } catch (err) {
        console.error(err.name, err.message);
    }
}

const logger = (req, res, next) => {
    const msg = `${req.method}\t${req.headers.origin}\t${req.path}`
    logEvents(msg, "reqLog");
    console.log(msg);
    next();
}

module.exports = { logger, logEvents };