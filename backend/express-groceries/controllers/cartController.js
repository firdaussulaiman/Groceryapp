const mongoose = require("mongoose");

const cartValidator = require("../joi-validators/Carts");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const productModel = require("../Models/Product");
const cartModel = require("../Models/Cart");
const lineItem = require("../Models/LineItem");
const userModel = require("../Models/User");

const addCarts = async (req, res) => {
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
    // check the cart is in the DB or not.
    if (!userCart) {
      const newUserCart = await cartModel.create({
        user: moongoose.Types.ObjectId(`${userId}`),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
