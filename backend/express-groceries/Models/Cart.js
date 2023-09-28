const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    lineItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "LineItem",
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

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
