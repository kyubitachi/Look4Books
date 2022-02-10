const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/Users");

User.createStrategy();

// auth signup
router.get("/signup", function (req, res) {
  res.render("signup.html.twig");
});

// auth login
router.get("/login", function (req, res) {
  res.render("login.html.twig");
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
