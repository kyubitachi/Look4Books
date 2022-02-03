const express = require("express");
const router = express.Router();
const twig = require("twig");
const path = require("path");

router.get("/", function (req, res) {
  res.render(path.join(__dirname, "..", "/views/extract.html.twig"));
});

module.exports = router;
