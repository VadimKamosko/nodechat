const socket = io();
let inpmsg = document.querySelector("#message");
let msgfield = document.querySelector("#msgfield");

document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch("/chat/getallmsgchat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id: document.location.pathname.split("/") }),
  });
  let ans = await response.json();
  console.log(ans);
  for (let i = 0; i < ans.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = ans[i].text;
    msgfield.appendChild(li);
  }
});

socket.on("connect", () => {
  socket.emit("roomjoin", document.location.pathname);
});
document.querySelector("#send").addEventListener("click", () => {
  socket.emit("sendmessage", {
    msg: inpmsg.value,
    roomid: document.location.pathname,
    token: localStorage.token,
  });
  inpmsg.value = "";
});

socket.on("chat message", (msg) => {
  let li = document.createElement("li");
  li.innerHTML = msg;
  msgfield.appendChild(li);
});
