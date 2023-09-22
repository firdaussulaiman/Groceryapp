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
//editProfile
const profileEditing = async (req, res) => {
  const userValidationResults = userValidator.userValidator.validate(req.body, {
    abortEarly: false,
  });

  let errorObj = {};
  // joi validation
  if (userValidationResults.error) {
    const validationError = userValidationResults.error.details;

    validationError.forEach((error) => {
      errorObj[error.context.key] = error.message;
    });

    res.status(400).json(errorObj);
  }

  try {
    let userId = req.params.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to get the user of id: ${userId}` });
  }
  try {
    const changedUser = userModel.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    const newUser = {
      name: changedUser.name,
      email: changedUser.email,
      userId: changedUser._id,
    };
    res.status(201).json({ message: "profile Updated!", newUser });
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const showUser = async (req, res) => {
  let userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to get user!" });
  }
  const data = {
    name: user.name,
    Email: user.email,
    userId: user._id,
  };
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(500).json({ message: "User not exists" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "failed to delete user!" });
  }
  return res.status(200).json({ message: "User deleted successfully!" });
};

module.exports = {
  registration,
  profileEditing,
  showUser,
  deleteUser,
};
