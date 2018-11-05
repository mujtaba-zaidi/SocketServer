const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;
var io = null;
var connectedSockets = [];

const server = require("http").createServer(app);

io = require("socket.io")(server, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});
io.on("connection", socket => {
  console.log("client connected: " + socket.id);
  socket.on("connect", function() {
    console.log("client connected: " + socket.id);
  });
  socket.on("disconnect", function() {
    console.log("client disconnected: " + socket.id);
  });
  socket.on("aTest", data => {
    console.log(data);
  });
  let i = 0;

  let myInterval = setInterval(() => {
    console.log(i);
    i++;
    socket.emit("timer", { Timer: i });
  }, 1000);
  myInterval;
});

server.listen(port, () => {
  console.log("We are live on " + port);
});
