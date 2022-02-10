const express = require("express");
const router = express.Router();
const twig = require("twig");
const passport = require("passport");

// Showing home page
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

  res.render("home.html.twig", {
    user_id: user_id,
    user_auth: user_auth,
  });
});

router.use((req, res, next) => {
  const error = new Error("Page non trouvée");
  error.status = 404;
  next(error);
});

router.use((error, req, res) => {
  res.status(error.status || 500);
  res.end(error.message);
});

module.exports = router;
