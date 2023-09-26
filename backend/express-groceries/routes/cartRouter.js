const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

//add to cart
router.post("/:userId/cart", cartController.addToCart);

//remove the items from cart
router.delete(
  "/:userId/cart/:lineItem/lineItem",
  cartController.removeFromCart
);

//update cart
router.patch("/:useId/cart/:lineItem/lineItem", cartController.updateCart);

//show cart

router.get("/:userId/cart", cartController.showCart);
