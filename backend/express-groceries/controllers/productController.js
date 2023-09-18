const productModel = require("../Models/Product");
const productsValidator = require("../joi-validators/Products");
// const asyncHandler = require("express-async-handler");

const fetchAllProducts = async (req, res) => {
  //empty the data first
  let allProducts = [];
  try {
    allProducts = await productModel.find();
    res.json({ allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to get the data from database!" });
  }
  // return res.json({ allProducts });
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
    res.status(404).json({ message: "unable to get the product!" });
  }
};

//The 2 methods will be granted to adminstrator;
const updatedProduct = async (req, res) => {
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

  return res.status(201).json(updatedProduct);
};

// below is the create product(post) only applicable to admin;

const createProduct = async (req, res) => {
  // To check the validation is not interrupted at early stage
  const productsValidationResults =
    productsValidator.productsValidator.validate(req.body, {
      abortEarly: false,
    });

  let errorObj = {}; // to store the result of the validation
  // return joi validation error messages if any.
  if (productsValidationResults.error) {
    const validationError = productsValidationResults.error.details;

    validationError.forEach((error) => {
      errorObj[error.context.key] = error.message;
    });
    // console.log(errorObj);
    return res.status(400).json(errorObj);
  }

  let validatedProduct = productsValidationResults;

  try {
    validatedProduct = await productModel.findOne({
      name: validatedProduct.name,
    });

    if (validatedProduct) {
      return res.status(409).json({ message: "Product exists!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "fail to get the product" });
  }

  // const { name, price, description, image, spec, category } = req.body;

  try {
    const product = req.body;

    await productModel.create(product);
    return res
      .status(201)
      .json({ message: "Product sucessfully created!", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to create product!" });
  }

  // return res.json();
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(500).json({ message: "Product not exists!" });
      return;
    }
    // const updatedProducts = await productModel.find();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete product!" });
  }
  return res.status(204).json({ message: "Product sucessful deleted!" });
};

module.exports = {
  fetchAllProducts,
  showAproduct,
  updatedProduct,
  createProduct,
  deleteProduct,
};
