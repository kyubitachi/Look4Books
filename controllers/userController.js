const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// use static serialize and deserialize of model for passport session support
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = class UserController {
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
