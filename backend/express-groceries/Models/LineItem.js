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
  },
  { timestamps: true }
);

const LineItems = mongoose.model("LineItem", lineItemSchema);
module.exports = LineItems;
