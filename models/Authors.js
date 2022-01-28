const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  firstName: String,
  birthDate: Number,
});

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model("Author", authorSchema);
