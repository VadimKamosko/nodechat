const { Router } = require("express");
const router = Router();
const { d } = require("../index");
const moduleAuth = require("../controller/auth.controller");

router.get("/", (req, res) => {
  res.sendFile(d + "/front/index.html");
});
router.get("/getAll", async (req, res) => {
  let result = await moduleAuth.getAllUser();
  res.json(result.rows);
});
router.get("/room/:id", async (req, res) => {
  res.sendFile(d + "/front/room.html");
});

module.exports = router;
