const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const path = require("path");

router.get("/signup", function (req, res) {
  res.render(path.join(__dirname, "..", "/views/signup.html.twig"));
});

router.get("/login", function (req, res) {
  res.render(path.join(__dirname, "..", "/views/login.html.twig"));
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
