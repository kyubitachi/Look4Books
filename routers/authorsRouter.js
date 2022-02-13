const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// add one author
router.post("/", authorController.addAuthor);

// display all authors
router.get("/", authorController.displayAuthors);

// display selected author
router.get("/:id", authorController.displayAuthor);

// update selected author
router.get("/update/:id", authorController.updateAuthor);

// update successfull
router.post("/updateServer", authorController.validateUpdate);

// delete selected author
router.post("/delete/:id", authorController.deleteAuthor);

module.exports = router;
