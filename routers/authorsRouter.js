const express = require("express");
const router = express.Router();
const twig = require("twig");
const authorController = require("../controllers/authorController");

router.post("/", authorController.addAuthor);
router.get("/:id", authorController.displayAuthor);
router.get("/", authorController.displayAuthors);
router.get("/update/:id", authorController.updateAuthor);
router.post("/updateServer", authorController.validateUpdate);
router.post("/delete/:id", authorController.deleteAuthor);

module.exports = router;
