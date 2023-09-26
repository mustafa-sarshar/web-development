const 
    fs = require("fs"),
    fsPromises = fs.promises,
    path = require("path"),
    { format } = require("date-fns"),
    { v4: uuidV4 } = require("uuid");

const logEvents = async (msg) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuidV4()}\t${msg}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "logs")))
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        await fsPromises.appendFile(path.join(__dirname, "logs", "log.txt"), logItem);
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents;