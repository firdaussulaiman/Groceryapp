const productModel = require("../Models/Product");
const { productsValidator } = require("../joi-validators/Products");
// const asyncHandler = require("express-async-handler");

const productvalidator = require("../joi-validators/Products");

const fetchAllProducts = async (req, res) => {
  //empty the data first
  let allProducts = [];
  try {
    allProducts = await productModel.find();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unable to get the data from database!" });
  }
  return res.json(allProducts);
  // res.json({ message: "Hello,it works!" });
};

// show the product for a specific product id
const showAproduct = async (req, res) => {
  let productId = req.params.id;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ message: `Unable to get the product of id: ${productId}` });
    }
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "unable to get the product!" });
  }
};

//The 2 methods will be granted to adminstrator;
const updateAProduct = async (req, res) => {
  let productId = req.params.id;
  let product = null;

  // find the product by id and error handling
  try {
    product = await productModel.findById(productId);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Unable to get the product of id: ${productId}` });
  }

  if (!product) {
    return res.status(404).json(product);
  }

  //update the product
  try {
    await product.updateOne(req.body);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product!" });
  }

  return res.status(201).json(product);
};

// below is the create product(post) only applicable to admin;

const createProduct = async (req, res) => {
  // To check the validation is not interrupted at early stage
  const productsValidationResults = productsValidator;
};

module.exports = {
  fetchAllProducts,
  showAproduct,
  updateAProduct,
  createProduct,
};
