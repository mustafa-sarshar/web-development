const { Server } = require("socket.io");
let io;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, { cors: { origin: "http://localhost:4200" } });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized!");
    }
    return io;
  },
};
