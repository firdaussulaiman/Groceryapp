const cartValidator = require("../joi-validators/Cart");

const mongoose = require("mongoose");

const productModel = require("../Models/Product");
const cartModel = require("../Models/Cart");
const lineItemModel = require("../Models/LineItem");

//create carts
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
        errorObject[error.context.key] = error.message;
      });
      //send the response to client and return;
      return res.status(400).json(errorObject);
    }
    console.log(1);
    let userCart = await cartModel.findOne({
      user: new mongoose.Types.ObjectId(`${userId}`),
      checkOut: false,
    });
    // check the cart is in the DB or not, if not create a new cart
    if (!userCart) {
      console.log(2);
      userCart = await cartModel.create({
        user: new mongoose.Types.ObjectId(`${userId}`),
        lineItems: [],
      });
      console.log("2b");
    }
    const lineItemExists = await lineItemModel.findOne({
      user: new mongoose.Types.ObjectId(`${userId}`),
      cart: new mongoose.Types.ObjectId(`${userCart._id}`), //to check the cart exists or not
      product: new mongoose.Types.ObjectId(`${productId}`),
    });
    console.log(3);
    // update the quantity if exists
    if (lineItemExists) {
      console.log(4);
      await lineItemModel.findByIdAndUpdate(lineItemExists._id, {
        $inc: {
          quantity,
        },

        cart: userCart._id,
      });
      //sort product stock reservation in the iteration of cart.
      // await productModel.findByIdAndUpdate(lineItemExists.product, {
      //   $inc: {
      //     stock: -quantity,
      //   },
      // });
      return res.status(200).json({ message: "item added to cart" });
    }
    console.log(5);
    if (!lineItemExists) {
      console.log(6);
      //create line item
      let lineItem = await lineItemModel.create({
        cart: new mongoose.Types.ObjectId(`${userCart._id}`),
        user: new mongoose.Types.ObjectId(`${userId}`),
        product: new mongoose.Types.ObjectId(`${productId}`),
        quantity,
      });

      //assign to the cart

      await cartModel.findByIdAndUpdate(userCart._id, {
        $addToSet: {
          lineItems: new mongoose.Types.ObjectId(lineItem),
        },
      });
      // await productModel.findByIdAndUpdate(lineItem.product, {
      //   $inc: {
      //     stock: -quantity,
      //   },
      // });
      // return res.status(200).json({ message: "item added to cart" });
    }

    console.log(7);
    return res
      .status(200)
      .json({ message: "Items has been added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Unable to add item to the cart" });
  }
};

// update cart
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
    const lineItem = await lineItemModel
      .findByIdAndUpdate(lineItemId)
      .populate({
        path: "item",
        select: ["stock"],
      });
    if (!lineItem) {
      return res.status(404).json({ message: "line item not found!" });
    }
    // let differenceOfStock = quantity - lineItem.quantity;
    // await productModel.findByIdAndUpdate(lineItem.product, {
    //   $inc: {
    //     stock: -differenceOfStock,
    //   },
    // });
    await lineItemModel.findByIdAndUpdate(lineItem, {
      quantity,
    });
    res.status(200).json({ message: "Cart updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "unable to update!" });
  }
};

//showCart

const showCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userCart = await cartModel
      .findOne({
        user: new mongoose.Types.ObjectId(`${userId}`),
        checkOut: false,
      })
      .populate([
        {
          path: "lineItems",
          select: ["_id", "quantity"],
          populate: {
            path: "item",
            select: ["name", "price"],
          },
        },
      ]);
    //check the cart exists or not
    if (!userCart) {
      res.status(404).json({ message: "cart cannot be found" });
    }
    console.log(2);
    console.log(userCart.lineItems[0].item);
    res.status(200).json(userCart);
    // console.log(userCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to load cart" });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const lineItemId = req.params.lineId;

  try {
    const lineItemToBeDelete = await lineItemModel
      .findById(lineItemId)
      .populate({
        path: "product",
        select: ["stock"],
      });

    //add stock back to stockcount

    await productModel.findByIdAndUpdate(lineItemToBeDelete.product, {
      $inc: {
        stock: lineItemToBeDelete.quantity,
      },
    });

    //remove from lineItem collection

    await lineItemModel.findByIdAndDelete(lineItemId);

    if (!lineItemToBeDelete) {
      return res.status(404).json({ message: "line item not found" });
    }

    //remove lineItemId from cart array

    await cartModel.findOneAndUpdate({
      user: new mongoose.Types.ObjectId(""),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to remove item from cart!" });
  }
};

const checkout = async (req, res) => {
  const userId = req.params.userId;

  try {
    //switch the cart to checkout

    await cartModel.findByIdAndUpdate(
      {
        user: new mongoose.Types.ObjectId(`${userId}`),
        checkOut: false,
      },
      { chechout: true }
    );

    await cartModel.create({
      user: new mongoose.Types.ObjectId(`${userId}`),
    });

    res.status(200).json({ message: "purchase completed!" });
  } catch (err) {
    console.log(error),
      res.status(500).json({ message: "Purchase not able to complete" });
  }
};

module.exports = {
  addToCart,
  updateCart,
  checkout,
  showCart,
  removeFromCart,
};
