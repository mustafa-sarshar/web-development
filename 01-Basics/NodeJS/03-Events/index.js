const
    EventEmitter = require("events"),
    logEvents = require("./log_events");

class MyEmitter extends EventEmitter { };

// Initialize Object
const myEmitter = new MyEmitter();

// Add listener for the log event
myEmitter.on("log", (msg) => { logEvents(msg) });

setTimeout(() => {
    // Emit event
    myEmitter.emit("log", "Log event emitted!!!");
}, 2000);