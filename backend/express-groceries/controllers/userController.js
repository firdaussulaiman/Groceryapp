const userModel = require("../Models/User");
const userValidator = require("../joi-validators/usersValidator");

const registration = async (req, res) => {
  //below to validate the user from validators

  const userValidationResults = userValidator.userValidator.validate(req.body, {
    abortEarly: false,
  });

  let errorObj = {};

  if (userValidationResults.error) {
    const validationError = userValidationResults.error.details;

    validationError.forEach((error) => {
      errorObj[error.context.key] = error.message;
    });

    res.status(400).json(errorObj);
  }

  let validatedUser = userValidationResults;

  try {
    validatedUser = await userModel.find({
      email: validatedUser.value.email,
    });
    if (validatedUser) {
      return res.status(409).json({ message: "User exists!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "failed to register the user!" });
  }

  // const salt = bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: passHash };

  try {
    await userModel.create(user);
    return res.status(201).json({ message: "user created!" });
  } catch (e) {
    res.status(500).json({ message: "failed to create user!" });
  }
  const userData = {
    name: user.name,
    Email: user.Email,
    userId: user._id,
  };
  return res.json(userData);
};
