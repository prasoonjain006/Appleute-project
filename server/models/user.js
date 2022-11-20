const mongoose = require("mongoose");

const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required:[true,'please enter a email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    // required:[true,'please enter a password'],
    minlength: [6, "minimum length should be 6"],
  },
  fullName: {
    type: String,
    // required:[true,'please enter your Full name'],
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
