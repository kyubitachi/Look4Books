const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { session } = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// use static serialize and deserialize of model for passport session support
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = class UserController {
  static getUsers(req, res) {
    User.find().then(function (users) {
      res.send(users);
    });
  }

  static getUser(req, res) {
    const id = req.params.id;
    User.findById(id).then(function (user) {
      res.send(user);
    });
  }

  static signup = (req, res) => {
    User.register(
      { username: req.body.email },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log("err register " + err);
        } else {
          const authenticate = User.authenticate();
          authenticate(req.body.email, req.body.password, function (err, user) {
            if (err) {
              console.log("Erreur d'authentification" + err);
            } else {
              if (user != false) {
                req.session.user_id = req.body.email;
                req.session.user_auth = true;
                console.log(req.session);
                res.redirect("/");
              } else {
                res.json({
                  success: false,
                  message: "L'authentication a échoué, veuillez réessayer",
                });
              }
              console.log("isAuth " + user);
            }
          });
        }
      }
    );
  };

  static login = (req, res, next) => {
    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, function (err, user) {
      if (err) {
        console.log("Erreur d'authentification" + err);
      } else {
        if (user != false) {
          req.session.user_id = req.body.email;
          req.session.user_auth = true;
          console.log(req.session);
          res.redirect("/");
        } else {
          res.json({
            success: false,
            message: "L'authentication a échoué, veuillez réessayer",
          });
        }
      }
    });
  };

  static logout = (req, res, next) => {
    req.session.destroy();
    return res.redirect("/");
  };
};
