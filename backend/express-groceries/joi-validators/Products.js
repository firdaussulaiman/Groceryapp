const Joi = require("joi");

//validate the model
const validators = {
  productsValidator: Joi.object({
    name: Joi.string().min(3).label("Name").required(),
    description: Joi.string().min(3).max(200).label("Description").required(),
    price: Joi.number().min(0).label("Price").required(),
    category: Joi.string().min(3).label("Category").required(),
    spec: Joi.string().min(2).label("Spec").required(),
    image: Joi.string().uri().label("Img URL").required(),
    stock: Joi.number().min(0).label("Stock").required(),
  }),
};

module.exports = validators;
