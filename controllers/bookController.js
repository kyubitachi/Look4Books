const mongoose = require("mongoose");
const fs = require("fs");
const Books = require("../models/Books");
const Authors = require("../models/Authors");

module.exports = class bookController {
  // add one book
  static addBook = (req, res) => {
    let titleRaw = req.body.title;
    let genreRaw = req.body.genre;
    let descriptionRaw = req.body.description;

    if (titleRaw == "") {
      titleRaw = "Unknown";
    }
    if (genreRaw == "") {
      genreRaw = "Unknown";
    }
    if (descriptionRaw == "") {
      descriptionRaw = "Unknown";
    }

    const book = new Books({
      _id: new mongoose.Types.ObjectId(),
      title: titleRaw,
      author: req.body.author,
      genre: genreRaw,
      description: descriptionRaw,
      image: req.file.path.substring(14),
    })
      .save()
      .then((result) => {
        res.redirect("/books");
      })
      .catch((error) => {
        console.log(error);
        req.session.message = {
          type: "danger",
          contents: error.message,
        };
        res.redirect("/books");
      });
  };

  // display all books
  static displayBooks = (req, res) => {
    Authors.find()
      .exec()
      .then((authors) => {
        Books.find()
          .populate("author")
          .exec()
          .then((books) => {
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

            res.render("books.html.twig", {
              user_id: user_id,
              user_auth: user_auth,
              books: books,
              authors: authors,
              message: res.locals.message,
            });
          })
          .catch((error) => {
            console.log(error);
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

  // display selected book
  static displayBook = (req, res) => {
    Books.findById(req.params.id)
      .populate("author")
      .exec()
      .then((book) => {
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

        res.render("book.html.twig", {
          user_id: user_id,
          user_auth: user_auth,
          book: book,
          isAnUpdate: false,
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

  // update selected book and open Update page
  static updateBook = (req, res) => {
    Authors.find()
      .exec()
      .then((authors) => {
        Books.findById(req.params.id)
          .populate("author")
          .exec()
          .then((book) => {
            res.render("book.html.twig", {
              book: book,
              authors: authors,
              isAnUpdate: true,
            });
          })
          .catch((error) => {
            console.log(error);
            req.session.message = {
              type: "danger",
              contents: error.message,
            };
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

  // update db if there's no error
  static validateUpdate = (req, res) => {
    const updateBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
    };
    Books.updateOne({ _id: req.body.id }, updateBook)
      .exec()
      .then((result) => {
        console.log(result);
        if (result.modifiedCount < 1) throw new Error("Modification ??chou??e");
        req.session.message = {
          type: "success",
          contents: "Modification effectu??e",
        };
        res.redirect("/books");
      })
      .catch((error) => {
        console.log(error);
        req.session.message = {
          type: "danger",
          contents: error.message,
        };
        res.redirect("/books");
      });
  };

  // update book's image
  static updateImage = (req, res) => {
    const book = Books.findById(req.body.id)
      .select("image")
      .exec()
      .then((book) => {
        fs.unlink("./public/images/" + book.image, (error) => {
          console.log(error);
        });
      });
    const updateBook = {
      image: req.file.path.substring(14),
    };
    Books.updateOne({ _id: req.body.id }, updateBook)
      .exec()
      .then((result) => {
        res.redirect("/books");
      })
      .catch((error) => {
        console.log(error);
        req.session.message = {
          type: "danger",
          contents: error.message,
        };
        res.redirect("/books/update/");
      });
  };

  // delete selected book
  static deleteBook = (req, res) => {
    const book = Books.findById(req.params.id)
      .select("image")
      .exec()
      .then((book) => {
        fs.unlink("./public/images/" + book.image, (error) => {
          console.log(error);
        });
        Books.remove({ _id: req.params.id })
          .exec()
          .then((result) => {
            req.session.message = {
              type: "success",
              contents: "Suppression effectu??e",
            };
            res.redirect("/books");
          })
          .catch((error) => {
            console.log(error);
            req.session.message = {
              type: "danger",
              contents: error.message,
            };
            res.redirect("/books");
          });
      });
  };
};
