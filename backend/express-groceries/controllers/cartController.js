const mongoose = require("mongoose");

const cartValidator = require("../joi-validators/Carts");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const productModel = require("../Models/Product");
const cartModel = require("../Models/Cart");
const lineItem = require("../Models/LineItem");
const userModel = require("../Models/User");

const addToCart = async (req, res) => {
  const userId = req.body.userId;
  const lineItemId = req.body.lineItemId;
  const quantity = req.body.quantity;

  try {
    // validation the lineItems
    let errorObject = {};
    const lineItemValidationResults = cartValidator.addToCartValidator.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (lineItemValidationResults) {
      //list the error and return
      const validationError = lineItemValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.error] = error.message;
      });
      //send the response to client and return;
      return res.status(400).json(errorObject);
    }
    const userCart = await cartModel.findOne({
      user: mongoose.Types.ObjectId(`${userId}`),
      checkOut: false,
    });
    // check the cart is in the DB or not, if not create a new cart
    if (!userCart) {
      const newCart = await cartModel.create({
        user: mongoose.Types.ObjectId(`${userId}`),
      });

      const lineItemExists = await lineItem.findOne({
        user: mongoose.Types.ObjectId(`${userId}`),
        cart: { $exists: false }, //to check the cart exists or not
        product: mongoose.Types.ObjectId(`${productId}`),
      });

      // update the quantity if exists
      if (lineItemExists) {
        await lineItem.findByIdAndUpdate(lineItemExists._id, {
          $inc: {
            quantity,
          },

          cart: newCart._id,
        });
        //sort product stock reservation in the iteration of cart.
        await productModel.findByIdAndUpdate(lineItemExists.product, {
          $inc: {
            stock: -quantity,
          },
        });
        // assign the linets to the cart.
        await cartModel.findByIdAndUpdate(newCart._id, {
          $addToSet: {
            lineItems: mongoose.Types.ObjectId(lineItemExists),
          },
        });
        return res.status(200).json({ message: "item added to cart" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Unable to add item to the cart" });
  }
};

module.exports = {
  addToCart,
};
