const productModel = require("../Models/Product");
// const asyncHandler = require("express-async-handler");

// const productvalidator =require("")

const fetchAllProducts = async (req, res) => {
  //empty the data first
  let allProducts = [];

  try {
    allProducts = await productModel.find();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unable to get the data from database!" });
  }
  return res.json({ allProducts });
};

const showAproduct = async (req, res) => {
  let productId = req.params.id;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "No product is found." });
    }
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get the product!" });
  }
};

const updateProduct = (module.exports = {
  fetchAllProducts,
  showAproduct,
});
