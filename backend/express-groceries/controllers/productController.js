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
  return res.json(allProducts);
};

// show the product for a specific product id
const showAproduct = async (req, res) => {
  let productId = req.params.id;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: `Unable to get the product of id: ${productId}` });
    }
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(404).json({error: "unable to get the product!"});
  }
};

const updateProduct =async (req,res)=>{
  let productId = req.params.id;
  let product = null;


  // find the product by id
  try {
    const product = await productModle.findById(productId);
    // return the status code and with json data of product
    if(!product) {
      return res.status(404).json(product);
    };

    res.json({product});
  }
}

(module.exports = {
  fetchAllProducts,
  showAproduct,
});
