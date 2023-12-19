const JWT = require("jsonwebtoken")
const {hashPassword, comparePassword}=require("../helpers/authHelper")
const userModel =require("../models/userModels")
var { expressjwt: jwt } = require("express-jwt");
//middleWare
const requireSignIn =jwt({
    secret:process.env.JWT_SECRET, algorithms: ["HS256"]
})
//register controller for register
const registerController = async (req,res)=>{
    try {
        const {name,email,password}=req.body
        //validation
        if(!name){
            return res.status(400).send({
                success:false,
                message:"name is required"
            })
        }
        if(!email){
            return res.status(400).send({
                success:false,
                message:"email is required"
            })
        }
        if(!password || password.length <6){
            return res.status(400).send({
                success:false,
                message:"password is required and 6 charecter long"
            })
        }

        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:"User Already Register With This Email"
            })
        }
        //hashed password
        const hashedPassword =await hashPassword(password)
        //save user
        const user=await userModel({name,email,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"Registeration successfull please login",
        })
    } catch (error) {
        console.log(`userController error => ${error}`)
        return res.status(500).send({
            success:false,
            message:"Error in Register API",
            error,
        })
    }
}
//login controller for login

const loginController=async(req,res)=>{
try {
    const {email,password}=req.body
    //validation
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:"please provide email or password"
        })
    }
    //find user
    const user =await userModel.findOne({email})
    if(!user){
        return res.status(500).send({
            success:false,
            messsage:"user not found"
        })
    }
    //match password
    const match=await comparePassword(password,user.password)
    if(!match){
        return res.status(500).send({
            success:false,
            message:"invalid user name and password"
        })
    }
    //TOKEN JWT
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })
    // -------------how to show undefiend user password------------------
        user.password=undefined
    // ------------------------------------
    res.status(200).send({
        success:true,
        message:"login successful",
        token,
        user,
    })
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(500).send({
        success:false,
        message:"error in login api",
        error,
    })
}
}

// updater user
const updateUserController = async(req,res)=>{
try {
    const {name,password,email}=req.body
    //find user
    const user=await userModel.findOne({email})
    //password validation
    if(password && password.length<6){
        return res.status(400).send({
            success:false,
            message:"Password Is Required and Should be atleast 6 charector long",
            error,
        })
    }
    const hashedPassword=password?await hashPassword(password):undefined
//updated user
const updatedUser=await userModel.findOneAndUpdate({email},{
    name: name || user.name,
    password: hashedPassword || user.password,
},{new:true})
updatedUser.password=undefined
res.status(200).send({
    success:true,
    message:"Profile updated please login",
    updatedUser,
})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In User Update Api",
    })
}
}
module.exports = {requireSignIn,registerController, loginController,updateUserController}
