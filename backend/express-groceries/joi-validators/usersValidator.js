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
      .required()
      .messages({ "any.only": "{{lablel}} does not match!" }),
  }),

  loginValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name").required(),
    password: Joi.string().min(4).max(16).label("Password").required(),
  }),

  editValidator: Joi.object({
    name: Joi.string().min(3).max(30).trim().label("Name"),
    email: Joi.string()
      .trim()
      .email()
      .min(5)
      .minDomainSegments(2)
      .domain({ tlds: { allow: ["com", "net"] } })
      .label("Email"),
  }),
  changePasswordValidator: Joi.object({
    currentPassword: Joi.string().min(3).label("Current Password").required(),
    newPassword: Joi.string().min(4).max(16).label("New Password").required(),
    confirmNewPassword: Joi.string()
      .equal(Joi.ref("newPassword"))
      .label("Confirm new password")
      .required()
      .messages({ "any.only": "{{lablel}} does not match!" }),
  }),
};

module.exports = validators;
