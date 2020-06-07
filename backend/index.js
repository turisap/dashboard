const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const app = express();
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => socket.emit("notification", "testy"), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, function() {
  console.log("app running on port.", server.address().port);
});
