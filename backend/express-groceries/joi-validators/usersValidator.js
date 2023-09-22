const Joi = require("joi");

const validators = {
  // registration validator:
  registerValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name").required(),
    email: Joi.string()
      .trim()
      .email()
      .min(5)
      .minDomainSegments(2) //  to verify the given domain and minmum is 2 segments
      .domain({ tlds: { allow: ["com", "net"] } }) // top-level-domain is com and net.
      .label("Email")
      .required(),
    password: Joi.string().min(4).max(16).label("Password").required(),
    confirmPassword: Joi.string()
      .equal(Joi.ref("Password"))
      .label("Confirm password")
      .required(),
  }),

  loginValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name").required(),
    password: Joi.string().min(4).max(16).label("Password").required(),
  }),
};
