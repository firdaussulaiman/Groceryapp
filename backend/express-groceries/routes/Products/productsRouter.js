const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  res.json({ products: "list of products" });
});

router.get("/products/new", (req, res) => {
  res.json({ product: "new product" });
});

router.get("/products/:id", (req, res) => {
  res.json({ product: "show product" });
});

module.exports = router;
