const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");
const usersValidator = require("../joi-validators/usersValidator");
const express = require("express");

//using function declaration
const logIn = async (req, res) => {
  let errObj = {};

  const userValidatorResults = usersValidator.loginValidator.validate(
    req.body,
    {
      abortEarly: false,
    }
  );

  if (userValidatorResults.error) {
    // return the details of the error in json
    const validationError = userValidatorResults.error.details;

    validationError.forEach((error) => {
      errObj[error.context.key] = error.message;
    });
    return res.status(400).json({ errObj });
  }

  const validatedUser = req.body;
  let errorMsg = "The password or email is incorrect";
  let user = null;

  try {
    user = await userModel.find({ email: validatedUser.email });
    if (!user) {
      return res.status(401).json({ message: errorMsg });
    }
  } catch (error) {
    return res.status(500).json({ message: "Fail to get user!" });
  }
};

module.exports = {
  logIn,
  passwordChange,
};
