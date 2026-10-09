const express = require('express');
const router = express.Router();
const authController = require("../controller/auth.controller.js");


// Register a new user
router.post('/register', authController.registerUser);



module.exports = router;