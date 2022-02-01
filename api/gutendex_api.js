// const axios = require("axios");

/*
const express = require("express");
const fs = require("fs");
const dbJsonPath = "./database/db.json";
const dbJsonRawData = fs.readFileSync(dbJsonPath);
let dbJson = JSON.parse(dbJsonRawData);
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser());

app.get("/", (req, res) => {
  res.json({ message: "bonjour" });
});

app.get("/datas", (req, res) => {
  res.json(dbJson);
});

app.get("/datas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id > dbJson.length) {
    res.send("nope");
  }
  const data = dbJson.filter((data) => data.id == req.params.id);
  res.json(data);
});

app.get("/data/add", (req, res) => {
  res.render("partials/dataadd");
});
app.get("/data/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = dbJson.filter((data) => data.id == id)[0];
  console.log(data);
  res.render("partials/dataedit", {
    data: data,
  });
});

app.post("/datas", (req, res) => {
  let { title, authors, bookshelves, image } = req.body;
  const data = {
    id: dbJson.length + 1,
    title,
    authors: {
      birth,
      death,
    },
    bookshelves,
    image,
  };
  dbJson.push(data);
  fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 4));

  res.redirect("/");
});

app.post("/datas/:id", (req, res, next) => {
  let { title, authors, bookshelves, image } = req.body;
  dbJson = dbJson.map((data) => {
    if (data.id == req.params.id) {
      return {
        ...data,
        title,
        authors,
        bookshelves,
        image,
      };
    } else {
      return data;
    }
  });

  fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 4));
  res.redirect("/data");
});
*/

/*
app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
});
*/
/*
axios
  .get("https://gutendex.com/books/11")
  .then((res) => {
    console.log(res.data.title);
    console.log(res.data.authors[0].name);
  })
  .catch((error) => {
    console.log(error);
  });
*/
