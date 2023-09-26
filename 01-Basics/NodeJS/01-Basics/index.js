// Global Object in Node.js vs document object in Vanilla JS
console.log(global);

// os Module
const os = require("os");
console.log(`OS:
Type: ${os.type()}
Version: ${os.version()}
HomeDir: ${os.homedir()}
HostName: ${os.hostname()}
`);

// global variables
console.log("Dirname:", __dirname);
console.log("Filename:", __filename);

// path module
const path = require("path");
console.log("Path Dirname:", path.dirname(__filename));
console.log("Path Basename:", path.basename(__filename));
console.log("Path Extname:", path.extname(__filename));
console.log("Path Parse:\n", path.parse(__filename));

// Import custom functions
const { funcHello, funcByeBye } = require("./custom_module");
funcHello();
funcByeBye();