const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
exports.isAuthenticateUser = catchAsyncErrors( async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401));
    }

    const decodedDate = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedDate.id);
    next();
})

// Logout User
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Admin 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(`Role ${req.user.role} is not allowed to access this resource`, 403)
            )
        }
        next();
    }
   
}