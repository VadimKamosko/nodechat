const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { d } = require("../index");
const map = new Map();
const nodemailer = require("nodemailer");
const moduleAuth = require("../controller/auth.controller");

router.post("/login", async (req, res) => {
  let user = await moduleAuth.getUser(req.body.login);
  if (user.rows.length == 1) {
    const isMatch = await bcrypt.compare(req.body.password, user.rows[0].password);
    if (isMatch) {
      let token = jwt.sign({ login: req.body.login, id: user.rows[0].id }, "KamoskoVS");
      res.json({ login: true, token: token, id: user.rows[0].id });
    } else res.json({ login: false });
  } else {
    res.json({ login: false });
  }
});

router.post("/newuser", async (req, res) => {
  let user = await moduleAuth.getUser(req.body.name);
  if (user.rows.length != 0) {
    res.json({ login: false });
  } else {
    res.json({ login: true });
  }
});

router.post("/addnewuser", async (req, res) => {
  let hashpass = bcrypt.hashSync(req.body.password, 12);
  let user = await moduleAuth.addUser(req.body.name, hashpass);
  let token = jwt.sign({ login: req.body.name, id: user.rows[0].id }, "KamoskoVS");
  res.json({ reg: true, token: token, id: user.rows[0].id });
});
router.post("/updatepass", async (req, res) => {
  let hashpass = bcrypt.hashSync(req.body.password, 12);
  let user = await moduleAuth.updateUser(req.body.name, hashpass);
  let token = jwt.sign({ login: req.body.name, id: user.rows[0].id }, "KamoskoVS");
  res.json({ reg: true, token: token, id: user.rows[0].id });
});

router.get("/reg", async (req, res) => {
  res.sendFile(d + "/front/reg.html");
});

router.post("/check", async (req, res) => {
  console.log(req.body);
  let code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  map.set(req.body.name, code);
  console.log(map);
  setTimeout(() => {
    console.log(req.body.name);
    map.delete(req.body.name);
  }, 60000);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "belabrandpost@gmail.com",
      pass: "SsY-Z48-kKt-FPK",
    },
  });

  let result = await transporter.sendMail({
    from: '"Node js" BelaBrandPost@gmail.com',
    to: req.body.name,
    subject: "Message from Node js",
    text: "This message was sent from Node js server.",
    html: `<h2>Ваш код ${code}</h2>`,
  });

  console.log(result);
  res.json({ code: "OK" });
});

router.get("/lostpass", (req, res) => {
  res.sendFile(d + "/front/lostpass.html");
});
router.get("/auth", (req, res) => {
  res.sendFile(d + "/front/auth.html");
});

router.post("/checkcode", (req, res) => {
  console.log(req.body);
  if (map.has(req.body.email)) {
    res.json({ ans: map.get(req.body.email) == req.body.code });
  } else {
    res.json({ ans: false });
  }
});

module.exports = router;
