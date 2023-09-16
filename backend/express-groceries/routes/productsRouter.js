const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/products", productController.fetchAllProducts);

// router.get("/products/new", (req, res) => {
//   res.json({ product: "new product" });
// });

//for normal user, they are not grant to create new product.

router.get("/products/:id", productController.showAproduct);

router.put("/products/:id", (req, res, next) => {});

module.exports = router;
