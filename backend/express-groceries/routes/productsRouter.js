const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.fetchAllProducts);

// router.get("/products/new", (req, res) => {
//   res.json({ product: "new product" });
// });

//for normal user, they are not grant to create new product.
router.post("/", productController.createProduct);

router.get("/:id", productController.showAproduct);

router.put("/:id", productController.updateAProduct);

module.exports = router;
