const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
});

userSchema.plugin(passportLocalMongoose, validator);

module.exports = mongoose.model("Users", userSchema);
