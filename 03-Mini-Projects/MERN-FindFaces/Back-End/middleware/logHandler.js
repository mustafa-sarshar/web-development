const { logEvents } = require("../utils/logger.js");

const logHandler = (req, res, next) => {
    const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(logMessage, "reqLog");
    console.log(logMessage);
    next();
};
module.exports = { logHandler };
