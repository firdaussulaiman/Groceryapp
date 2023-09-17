const Joi = require("joi");

//validate the model
const validators = {
  createCartValidator: Joi.object(),
  addToCartValidator: Joi.object({
    id: Joi.string().label("Id").required(),
    quantity: Joi.number().min(1).label("Quantity").required(),
  }),
  updateCartValidator: Joi.object({
    quantity: Joi.number().min(1).label("Quantity").required(),
  }),
};

module.exports = validators;
