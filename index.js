const express = require("express");
app = express();
const httpServer = require("http").Server(app);
const { Server } = require("socket.io");
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
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

httpServer.listen(3000, () => {
  console.log("Started");
});
