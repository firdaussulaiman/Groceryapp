const express = require("express");
// const autheController=require('../controllers/authController')
const userController = require("../controllers/userController");

const router = express.Router();

//create user or sign up
router.post("/auth/register", userController.registration);

router.get("/profile/:id", userController.showUser);

router.delete("./profile/:id", userController.deleteUser);

router.put("./profile/:id", userController.profileEditing);
