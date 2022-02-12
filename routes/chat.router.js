const { Router } = require("express");
const router = Router();
const { d } = require("../index");
const moduleAuth = require("../controller/auth.controller");
const moduleGroup = require("../controller/group.module");
const moduleChat = require("../controller/chat.module");
const chatModule = require("../controller/chat.module");

router.get("/", (req, res) => {
  res.sendFile(d + "/front/index.html");
});
router.get("/getAll", async (req, res) => {
  let result = await moduleAuth.getAllUser();
  res.json(result.rows);
});
router.post("/getallmsgchat", async (req, res) => {
  let ans = await chatModule.getMsgs(req.body.id[req.body.id.length - 1]);
  res.json(ans.rows);
});
router.get("/room/:id", async (req, res) => {
  res.sendFile(d + "/front/room.html");
});

router.post("/getAllGroup", async (req, res) => {
  let groups = await moduleGroup.getGroup(req.body.id);
  res.json(groups.rows);
});
router.post("/creategroup", async (req, res) => {
  let id = req.body.users.sort().join("_");
  let idgroup = await moduleGroup.createGroup(req.body.groupname, id);
  moduleGroup.createUserToGroup(idgroup.rows[0].id, req.body.users);
  res.json({ ans: true });
});
module.exports = router;
