const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static getUsers(req, res) {
    User.find().then(function (users) {
      res.send(users);
    });
  }

  static getUser(req, res) {
    const id = req.params.id;
    Article.findById(id).then(function (user) {
      res.send(user);
    });
  }

  static signup = (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10) // 10 → encryption difficulty (longer time for higher number)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.redirect("/");
          })
          .catch((error) => res.status(400).json({ error: "400" }));
      })
      .catch((error) => res.status(500).json({ error: "500" }));
  };

  static login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Email incorrect" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error: "400" }));
      })
      .catch((error) => res.status(500).json({ error: "500" }));
  };

  static logout = (req, res, next) => {
    res.clearCookie("nToken");
    return res.redirect("/");
  };
};
