const socketIo = require("socket.io");
const { fakeNotification } = require("./mocks");

let interval;

const setupWSConnection = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(
      () => socket.emit("notification", fakeNotification()),
      1000
    );
    socket.on("disconnect", () => {
      clearInterval(interval);
    });
  });
};

module.exports = setupWSConnection;
