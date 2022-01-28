const express = require("express");
const server = express();
require("dotenv").config();
const morgan = require("morgan");
const bookRouter = require("./routers/booksRouter");
const authorRouter = require("./routers/authorsRouter");
const router = require("./routers/router");
const api = require("./api/gutendex_api");

server.use(express.static("public"));

server.use(morgan("dev"));

server.use("/books/", bookRouter);
server.use("/authors/", authorRouter);
server.use("/", router);

server.listen(3000, () => {
  console.log(`Server listen at http://localhost:${3000}`);
});
