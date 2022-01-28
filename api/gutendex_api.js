const axios = require("axios");

axios
  .get("https://gutendex.com/books/11/")
  .then((res) => {
    console.log(res.data.title);
    console.log(res.data.authors[0].name);
  })
  .catch((error) => {
    console.log(error);
  });
