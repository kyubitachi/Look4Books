const mongoose = require("mongoose");
const fs = require("fs");
const Books = require("../models/Books");
const Authors = require("../models/Authors");

// add one book
exports.addBook = (req, res) => {
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
exports.displayBooks = (req, res) => {
  Authors.find()
    .exec()
    .then((authors) => {
      Books.find()
        .populate("author")
        .exec()
        .then((books) => {
          res.render("books.html.twig", {
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
exports.displayBook = (req, res) => {
  Books.findById(req.params.id)
    .populate("author")
    .exec()
    .then((book) => {
      res.render("book.html.twig", {
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
exports.updateBook = (req, res) => {
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
exports.validateUpdate = (req, res) => {
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
      if (result.modifiedCount < 1) throw new Error("Modification échouée");
      req.session.message = {
        type: "success",
        contents: "Modification effectuée",
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
exports.updateImage = (req, res) => {
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
      res.redirect("/books"); // ("/books/update/"+req.body.id)
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
exports.deleteBook = (req, res) => {
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
            contents: "Suppression effectuée",
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
