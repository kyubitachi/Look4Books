const mongoose = require("mongoose");
const fs = require("fs");
const Authors = require("../models/Authors");
const Books = require("../models/Books");

// add one author
exports.addAuthor = (req, res) => {
  let nameRaw = req.body.name;
  let firstNameRaw = req.body.firstName;
  let birthDateRaw = req.body.birthDate;

  if (nameRaw == "") {
    nameRaw = "John";
  }
  if (firstNameRaw == "") {
    firstNameRaw = "Doe";
  }
  if (birthDateRaw == "") {
    birthDateRaw = 0;
  }

  const author = new Authors({
    _id: new mongoose.Types.ObjectId(),
    name: nameRaw,
    firstName: firstNameRaw,
    birthDate: birthDateRaw,
  });
  author
    .save()
    .then((result) => {
      res.redirect("/authors");
    })
    .catch((error) => {
      console.log(error);
      req.session.message = {
        type: "danger",
        contents: error.message,
      };
      res.redirect("/authors");
    });
};

// display all authors
exports.displayAuthors = (req, res) => {
  Authors.find()
    .populate("books")
    .exec()
    .then((authors) => {
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

      res.render("authors.html.twig", {
        user_id: user_id,
        user_auth: user_auth,
        authors: authors,
      });
    })
    .catch((error) => {
      console.log(error);
      req.session.message = {
        type: "danger",
        contents: error.message,
      };
    });
};

// display selected author
exports.displayAuthor = (req, res) => {
  Authors.findById(req.params.id)
    .populate("books")
    .exec()
    .then((author) => {
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

      res.render("author.html.twig", {
        user_id: user_id,
        user_auth: user_auth,
        author: author,
        isUpdate: false,
      });
    })
    .catch((error) => {
      console.log(error);
      req.session.message = {
        type: "danger",
        contents: error.message,
      };
    });
};

// update selected author and open Update page
exports.updateAuthor = (req, res) => {
  Authors.findById(req.params.id)
    .populate("books")
    .exec()
    .then((author) => {
      res.render("author.html.twig", { author: author, isUpdate: true });
    })
    .catch((error) => {
      console.log(error);
      req.session.message = {
        type: "danger",
        contents: error.message,
      };
    });
};

// update db if there's no error
exports.validateUpdate = (req, res) => {
  const updateAuthor = {
    firstName: req.body.firstName,
    name: req.body.name,
    birthDate: req.body.birthDate,
  };
  Authors.updateOne({ _id: req.body.id }, updateAuthor)
    .exec()
    .then((result) => {
      if (result.modifiedCount < 1) throw new Error("Modification échouée");
      req.session.message = {
        type: "success",
        contents: "Modification effectuée",
      };
      res.redirect("/authors");
    })
    .catch((error) => {
      console.log(error);
      req.session.message = {
        type: "danger",
        contents: error.message,
      };
      res.redirect("/authors");
    });
};

// delete selected author
exports.deleteAuthor = (req, res) => {
  Authors.find()
    .where("name")
    .equals("anonyme")
    .exec()
    .then((author) => {
      Books.updateMany(
        { author: req.params.id },
        {
          $set: {
            author: author[0]._id,
          },
        },
        { multi: true }
      )
        .exec()
        .then(
          Authors.remove({ _id: req.params.id })
            .where("name")
            .ne("anonyme") // not equals
            .exec()
            .then((result) => {
              req.session.message = {
                type: "success",
                contents: "Suppression effectuée",
              };
              res.redirect("/authors");
            })
            .catch((error) => {
              console.log(error);
              req.session.message = {
                type: "danger",
                contents: error.message,
              };
              res.redirect("/authors");
            })
        );
    });
};
