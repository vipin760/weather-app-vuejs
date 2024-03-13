const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt');
const User = require('../model/user.model')
const ErrorHandler = require('../util/errorHandler')
const jwt = require('jsonwebtoken')
const sendToken = require("../util/jwtToken");

///////////////////////////////////////////////////////////////////////////////////
const generateToken = (user) =>{
    const token = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:process.env.JWT_EXPIRE})
    return token
}
////////////////////////////////////////////////////////////////////////////////////

exports.userRegister = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} =req.body
    const passwordHash = await bcrypt.hash(password,10)
    await User.create({
        name,email,password:passwordHash
    }).then((data)=>{
        return res.status(201).send({status:true, message:"user registration completed"});
    })
    
})

////////////////////////////////////////////////////////////////////////////////////
exports.userLogin = catchAsyncErrors( async (req,res,next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password",400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or password",401))
    }
    const isPasswordTrue =await bcrypt.compare(password,user.password);
    if(!isPasswordTrue){
        return next(new ErrorHandler("invalid email or password",401));
    }
    const token = generateToken(user)
    if(token){
        sendToken(token,201,res);
    }
})
/////////////////////////////logout///////////////////////////////////////////////////////
exports.logoutUser = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(201).send({status:true, message:"Loggout Success"})
})