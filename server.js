const express = require("express");
const server = express();
const morgan = require("morgan");
const bookRouter = require("./routers/booksRouter");
const authorRouter = require("./routers/authorsRouter");
const router = require("./routers/router");
const api = require("./api/gutendex_api");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

server.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

mongoose.connect("mongodb://localhost/look4books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(express.static("public"));

server.use(morgan("dev"));

// parse the URL-encoded data with the querystring library
server.use(bodyParser.urlencoded({ extended: false }));

server.set("trust proxy", 1);

server.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
server.use("/books/", bookRouter);
server.use("/authors/", authorRouter);
server.use("/", router);

server.listen(3000, () => {
  console.log(`Server listen at http://localhost:${3000}`);
});
