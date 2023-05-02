const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncError');
const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { createError } = require('../utils/error')
//const sendToken = require('../utils/jwtToken')
const jwt = require('jsonwebtoken')
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });

    const { userName, email, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync( password, salt);

    const newUser = await User.create({
        userName,
        email,
        password: hash,
        role,
        
    });

    await newUser.save();
    res.status(200).send("User has been created.");  
})

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compareSync(
        password,
        user.password
    );
    if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ 
        id: user.uuid, role: user.role 
        },
        process.env.JWT_SECRET,
        //{ expires: "24h"}
    );
    //sendToken(user, 200, res);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'successfully login', role: user.role, token: token });

})

//OTP generator
// exports.optGenerator = catchAsyncErrors(async (req, res, next) => {

// })

//logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });  
})