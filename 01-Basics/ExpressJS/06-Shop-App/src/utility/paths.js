const path = require("path");
const pathRoot = path.dirname(require.main.filename);
const pathData = path.join(pathRoot, "data", "data.json");

module.exports = { pathRoot, pathData };
