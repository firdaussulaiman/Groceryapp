const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");
const userValidator = require("../joi-validators/usersValidator");
const { createSecretToken } = require("../util/SecretToken");

//using function declaration
const logIn = async (req, res) => {
  let errObj = {};

  const userValidatorResults = userValidator.loginValidator.validate(req.body, {
    abortEarly: false,
  });

  if (userValidatorResults.error) {
    // return the details of the error in json
    const validationError = userValidatorResults.error.details;

    validationError.forEach((error) => {
      errObj[error.context.key] = error.message;
    });
    return res.status(400).json(errObj);
  }

  const validatedUser = req.body;
  let errorMsg = "Incorrect password or email";
  let user = null;

  try {
    user = await userModel.findOne({ email: validatedUser.email });
    if (!user) {
      return res.status(401).json({ message: errorMsg });
    }
  } catch (error) {
    return res.status(500).json({ message: "Fail to get user!" });
  }
  console.log(validatedUser.password);
  console.log(user.password);
  const auth = await bcrypt.compare(validatedUser.password, user.password);
  if (!auth) {
    return res.json({ message: errorMsg });
  }

  const token = createSecretToken(user._id);

  res.status(201).json({
    message: "Log in successfully",
    success: true,
    token,
    user: user._id,
  });
};

const passwordChange = async (req, res) => {
  //validate the changePasswordvalidator
  let errorObj = {};

  const passwordChangeValidationResults =
    userValidator.changePasswordValidator.validate(req.body, {
      abortEarly: false,
    });

  if (passwordChangeValidationResults.error) {
    const validationError = passwordChangeValidationResults.error.details;

    validationError.forEach((error) => {
      errorObj[error.context.key] = error.message;
    });
    return res.status(400).json(errorObj);
  }
  let userId = req.params.userId;

  try {
    const checkUser = await userModel.findById(userId);

    if (!checkUser) {
      res.status(404).json({ message: "User not exists!" });
    }

    // To compare the password in the req body and the user's password in the db.
    const checkPasswordOk = await bcrypt.compare(
      req.body.currentPassword,
      checkUser.password
    );

    if (!checkPasswordOk) {
      return res.status(401).json({ message: "Incorrect current password" });
    }
    // to compare the new password and confirm new password.
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password does not match" });
    }

    const passHash = await bcrypt.hash(req.body.newPassword, 10);
    const isPasswordSame = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (isPasswordSame) {
      return res
        .status(409)
        .json({ message: "Please enter your new password" });
    }

    try {
      await userModel.findByIdAndUpdate(userId, {
        password: passHash,
      });
    } catch (e) {
      return res.status(500).json({ message: "failed to update password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  logIn,
  passwordChange,
};
