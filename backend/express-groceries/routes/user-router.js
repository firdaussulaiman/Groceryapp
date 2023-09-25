const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

//create user or sign up
router.post("/auth/register", userController.registration);

//Testing
// router.get("/auth/signup", (req, res) => {
//   res.send("Sign-up page!");
// });

router.get("/profile/:id", userController.showUser);

router.delete("/profile/:id", userController.deleteUser);

router.put("./profile/:id", userController.profileEditing);

//login route
router.post("/auth/login", authController.logIn);

module.exports = router;
