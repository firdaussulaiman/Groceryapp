const mongoose = require("mongoose");
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
      unique: true,
    },
    password: {
      type: String,
      minLength: 7,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      Type: Date,
      default: new Date(),
    },
  }
  // { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
