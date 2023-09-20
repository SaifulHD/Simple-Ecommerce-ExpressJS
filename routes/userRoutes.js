const express = require("express");
const router = express.Router();

//IMPORT CONTROLLER
const userController = require("../controller/userController");

//ROUTING
router.get("/getUser", userController.getAllUsers);
router.post("/postUser", userController.saveUser);
router.post("/loginUser", userController.loginUser);
router.get("/getUser/:id", userController.getUser);

module.exports = router;
