const mongoose = require("mongoose");
const kids = require("./kidModel");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  type: { type: String, required: true },
  //For parents options=kids , coaches options=confirmedsessions
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kids",
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
