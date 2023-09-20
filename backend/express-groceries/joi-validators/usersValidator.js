const Joi = require("joi");

const validators = {
  // registration validator:
  registerValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name").required(),
    email: Joi.string().trim(),
    git,
  }),
};
