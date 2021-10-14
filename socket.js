let socket = {
  init: (io) => {
    io.on("connection", (socket) => {
      socket.on("roomjoin", (roomid) => {
        socket.join(roomid);
      });
      socket.on("sendmessage", (msg) => {
        io.to(msg.roomid).emit("chat message", msg.msg);
      });
    });
  },
};

module.exports = socket;
