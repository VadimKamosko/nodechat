const socket = io();
let inpmsg = document.querySelector("#message");
let msgfield = document.querySelector("#msgfield");

socket.on("connect", () => {
  socket.emit("roomjoin", document.location.pathname);
});
document.querySelector("#send").addEventListener("click", () => {
  socket.emit("sendmessage", { msg: inpmsg.value, roomid: document.location.pathname });
  inpmsg.value = "";
});

socket.on("chat message", (msg) => {
  let li = document.createElement("li");
  li.innerHTML = msg;
  msgfield.appendChild(li);
});
