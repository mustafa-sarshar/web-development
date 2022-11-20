const { logEvents } = require("../utils/logger.js");

const errorHandler = (err, req, res, next) => {
    const errMessage = `${err.name}:\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(errMessage, "errLog");
    console.log(err.stack);

    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({ message: err.message });
};

module.exports = { errorHandler };
