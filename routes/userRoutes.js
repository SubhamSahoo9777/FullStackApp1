const express = require('express')
const {registerController, loginController,updateUserController, requireSignIn} = require("../controllers/userController")
//router object
const router =express.Router()


//routes
//Register || post
router.post("/register",registerController)

//Register || post
router.post("/login",loginController)
//export
//update || put
router.put("/update-user",requireSignIn,updateUserController)
module.exports = router
