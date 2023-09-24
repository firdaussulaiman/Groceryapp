const mongoose = require("mongoose");

const cartValidator = require("../joi-validators/Carts");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const productModel = require("../Models/Product");
const cartModel = require("../Models/Cart");
const lineItemModel = require("../Models/LineItem");
const userModel = require("../Models/User");

const addToCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
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
    if (lineItemValidationResults.error) {
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

      const lineItemExists = await lineItemModel.findOne({
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
      if(!lineItemExists){
         //create line item
         let lineItem =await lineItemModel.create({
          cart: mongoose.Types.ObjectId(`${newCart._id}`),
          user: mongoose.Types.ObjectId(`${userId}`),
          product: mongoose.Types.ObjectId('${productId}'),
          quantity,
         });

         //assign to the cart

         await cartModel.findByIdAndUpdate(userCart._id, {
          $addToSet: {
            lineItems: mongoose.Types.ObjectId(lineItem),
          },
         })
         await productModel.findByIdAndUpdate(lineItem.product, {
          $inc:{
            stock: -quantity,
          }
        });
        return res.status(200).json({message:"item added to cart"});
      }

    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Unable to add item to the cart" });
  }
};

const updateCart = async (req, res) => {
  const lineItemId = req.params.lineItemId;
  const quantity = req.body.quantity;

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

  try {
    // Populate with the product stock.
    const lineItem =await lineItemModele.findByIdAndUpdate(lineItemId).populate({
      path:"product",
      select:["stock"],
    });
    if(!lineItem){
      return res.status(404).json({message:"line item not found!"});
    }
    let differenceOfStock = quantity - lineItem.quantity;
    await productModel.findByIdAndUpdate(lineItem.product, {
      $inc:{
            stock: -differenceOfStock,
          }
    });
    await lineItemModel.findByIdAndUpdate(lineItem, {
      quantity,
    })
    res.status(200).json({message:"Cart updated"});
  }catch(e){
    console.log(e);
    res.status(500).json({message:"unable to update!"});
  }
};

const showCart = async (req,res)=>{
  const userId = req.params.userId;

  try {
    const userCart = await cartModel.findOne({
      user:mongoose.Types.ObjectId(`${userId}`),
      checkOut: false,
    }).populate([
      {
        path:"lineItems",
        select:["_id","quantity"],
        populate:{
          path:"product",
          select:[
            "name",
            "price",

          ]
        }
      }
    ])
  }


}

// const removeFromCart =




module.exports = {
  addToCart,
  updateCart
};
