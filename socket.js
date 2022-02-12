const chatModule = require("./controller/chat.module");
const jwt = require("jsonwebtoken");

let socket = {
  init: (io) => {
    io.on("connection", (socket) => {
      socket.on("roomjoin", (roomid) => {
        socket.join(roomid);
      });
      socket.on("sendmessage", (msg) => {
        io.to(msg.roomid).emit("chat message", msg.msg);
        jwt.verify(msg.token, "KamoskoVS", function (err, decoded) {
          chatModule.setMessage(
            msg.roomid.split("/")[msg.roomid.split("/").length - 1],
            new Date(),
            decoded.login,
            msg.msg,
            "txt"
          );
        });
      });
    });
  },
};

module.exports = socket;
