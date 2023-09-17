const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      require: true,
    },

    lineItems: [
      {
        itemsId: ObjectId,
        ref: "lineItem",
        unique: true,
      },
    ],
    checkOut: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = ("Cart", cartSchema);
