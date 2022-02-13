const express = require("express");
const router = express.Router();
const twig = require("twig");
const path = require("path");

// Showing extract page
router.get("/", (req, res) => {
  if ("user_id" in req.session) {
    user_id = req.session.user_id;
  } else {
    user_id = "None";
  }
  if ("user_auth" in req.session) {
    user_auth = req.session.user_auth;
  } else {
    user_auth = false;
  }
  console.log(req.session);

  res.render("extract.html.twig", {
    user_id: user_id,
    user_auth: user_auth,
  });
});

module.exports = router;
