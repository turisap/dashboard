const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const io = require("./ws");
const routes = require("./routes.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

const server = http.createServer(app);

io(server);

server.listen(port, function() {
  console.log("app running on port.", server.address().port);
});
