const http = require("http");
const { requestHandler } = require("./routes");

const PORT = 3000;
const httpServer = http.createServer(requestHandler);

httpServer.listen(PORT);
