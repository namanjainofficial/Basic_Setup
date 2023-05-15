const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncError');
const { Customer } = require('../models');
const bcrypt = require("bcryptjs");
const { createError } = require('../utils/error')
//const {sendToken} = require('../utils/jwtToken')
const jwt = require('jsonwebtoken')
const cloudinary = require("cloudinary");

//register a customer
exports.registerCustomer = catchAsyncErrors(async (req, res, next) => {

    const { username, email, password, phone_number } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync( password, salt);

    const newCustomer = await Customer.create({
        username,
        email,
        password: hash,
        phone_number,
        
    });

    await newCustomer.save();
    res.status(200).send("customer has been created.");  
})

//login user
exports.loginCustomer = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    
    if (!customer) return next(createError(404, "customer Not Found/ register"));

    const isPasswordCorrect = await bcrypt.compareSync(
        password,
        customer.password
    );
    if (!isPasswordCorrect)
        return next(createError(404, "Email or password does not Match!"));

    const token = jwt.sign({ 
        id: customer.uuid, role: customer.role 
        },
        process.env.JWT_SECRET,
       // { expiresIn: process.env.JWT_EXPIRE}
    );
    //sendToken(user, 200, res);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'successfully login', role: customer.role, token: token });

})


//logout
exports.logoutCustomer = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });  
})