const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    //   name: {
    //     type: String,
    //     unique: true,
    //   },
    //   quantity:{
    //           type: Number,
    //           required: true,
    //           min: 1,
    //           default: 1
    //       },
    //   price: {
    //     type: Number,
    //     required: true,
    // }]
    checkOut: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = ("Cart", cartSchema);
