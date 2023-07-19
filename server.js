const mongoose = require("mongoose");
const socketIO = require("socket.io");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    process.exit(1);
  });

const server = app.listen(PORT);

const io = socketIO(server);
// general chat
// io.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     console.log(`Message from client: ${msg}`);
//     // 2. server send msg to all frontend users
//     io.emit("message", msg);
//   });
// });

// rooms implementation
const nodeNamespace = io.of("/nodeNamespace");

nodeNamespace.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    nodeNamespace
      .in(data.room)
      .emit("message", `New user joined ${data.room} room`);
  });
  socket.on("message", (data) => {
    nodeNamespace.in(data.room).emit("message", data.msg);
  });
});

module.exports = server;
