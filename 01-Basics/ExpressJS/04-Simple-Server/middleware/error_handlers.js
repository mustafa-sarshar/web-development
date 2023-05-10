const { logEvents } = require("./log_events");

const errorHandler = (err, req, res, next) => {
  const msg = `${req.method}\t${req.headers.origin}\t${req.path}\t${err.name}\t${err.message}`;
  logEvents(msg, "errLog");
  console.error(err.stack);
  res
    .status(500) // Server internal error
    .send(err.message);
};

module.exports = errorHandler;
