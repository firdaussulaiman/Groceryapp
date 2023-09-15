const Joi = require("joi");

//validate the model
const validators = {
  productsValidator: Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(3).max(200),
    //the rest of the elements
  }),
};

module.exports = validator;
