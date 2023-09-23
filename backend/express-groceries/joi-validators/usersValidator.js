const Joi = require("joi");

const validators = {
  // registration validator:
  registerValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name").required(),
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) //to check the domain segment and the top-level domain for the com and net.
      .label("Email")
      .required(),
    password: Joi.string().min(4).label("Password").required(),
    confirmPassword: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  }),

  loginValidator: Joi.object({
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email")
      .required(),
    password: Joi.string().min(4).label("Password").required(),
  }),

  editValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name"),
    email: Joi.string()
      .trim()
      .min(5)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) //to check the domain segment and the top-level domain for the com and net.
      .label("Email"),
  }),
  changePasswordValidator: Joi.object({
    currentPassword: Joi.string().min(4).label("Current Password").required(),
    newPassword: Joi.string().min(4).label("New Password").required(),
    confirmNewPassword: Joi.string()
      .equal(Joi.ref("newPassword"))
      .required()
      .label("Confirm new password")
      .messages({ "any.only": "{{lablel}} does not match!" }),
  }),
};

module.exports = validators;
