const express = require("express");
const http = require("http");
const server = express();
const morgan = require("morgan");
const bookRouter = require("./routers/booksRouter");
const authorRouter = require("./routers/authorsRouter");
const router = require("./routers/router");
const api = require("./api/gutendex_api");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

const port = process.env.APP_PORT;
const localhost = process.env.APP_LOCALHOST;
const secret = process.env.SECRET_APP;

const dbcredentials = process.env.DB_CREDENTIALS;

mongoose.connect(dbcredentials, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

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

server.listen(port, () => {
  console.log(`Listening on port http://${localhost}:${port}`);
});
