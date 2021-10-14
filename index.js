const express = require("express");
app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.json({ extended: true }));

require("./socket").init(io);

exports.d = __dirname;
app.use("", require("./routes/auth.router"));
app.use("/chat/", require("./routes/chat.router"));

httpServer.listen(3000, () => {
  console.log("Started");
});
