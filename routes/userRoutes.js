const express = require("express");
const { newUserController, loginController } = require("../controllers/userController");
const router = express.Router();


router.post("/signup",newUserController );
router.post('/login', loginController);



module.exports = router ;