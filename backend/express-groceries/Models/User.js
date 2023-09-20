const mongoose = require("mongoose");
const jwt = require("jsonwebToken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 7,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
