const socketIo = require("socket.io");
const faker = require("faker");

let interval;

const fakeNotifications = {
  success: ["New payment received", "Refund recieved", "New report created"],
  failure: [
    "Payment declined",
    "Unsufficient funds",
    "Reciever cancelled payment",
  ],
};

const getFakeNotification = () => {
  const type = faker.random.boolean() ? "failure" : "success";
  const text =
    fakeNotifications[type][
      Math.floor(Math.random() * fakeNotifications[type].length)
    ];

  return { type, text };
};

const setupWSConnection = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(
      () => socket.emit("notification", getFakeNotification()),
      20000
    );
    socket.on("disconnect", () => {
      clearInterval(interval);
    });
  });
};

module.exports = setupWSConnection;
