const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "at least to be 1"],
    },
  },
  { timestamps: true }
);

const LineItems = mongoose.model("LineItem", lineItemSchema);
module.exports = LineItems;
