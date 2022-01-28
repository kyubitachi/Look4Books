const express = require("express");
const router = express.Router();
const multer = require("multer");
const bookController = require("../controllers/bookController");
const Books = require("../models/Books");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const date = new Date().toLocaleDateString().replace(/\//g, "-");
    cb(
      null,
      date + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Image non valide"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// https://stackoverflow.com/questions/50144920/issue-with-multer-not-allowing-a-default-image
/*
router.post("/", upload.single("image"), bookController.addBook, (req, res) => {
  User.findById(req.user._id, (err, user) => {
    upload(req, res, (err) => {
      if (err) {
        console.log("1");
        req.flash("error");
        return res.redirect("/books");
      }
      const book = new Books();
      if (typeof req.file === "undefined") {
        console.log("2");
        book.image = "../public/images/none.svg";
      }
    });
  });
});
*/

// add one book
router.post("/", upload.single("image"), bookController.addBook);

// display all books
router.get("/", bookController.displayBooks);

// display selected book
router.get("/:id", bookController.displayBook);

// update selected book
router.get("/update/:id", bookController.updateBook);

router.post("/updateServer", bookController.validateUpdate);

router.post("/updateImage", bookController.updateImage); // upload.single("image"),

// delete selected book
router.post("/delete/:id", bookController.deleteBook);

module.exports = router;
