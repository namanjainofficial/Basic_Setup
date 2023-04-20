const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncError');
const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { createError } = require('../utils/error')
const sendToken = require('../utils/jwtToken')
const jwt = require('jsonwebtoken')

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
        ...req.body,
        password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    // const user = new User({
    //     ...req.body,
    //     password: hash,
    // });
    // sendToken(user, 201, res);
    // res.status(201).send("User has been created.");
})

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    // const { email, password } = req.body;

    // // checking if user has given password and email both

    // if (!email || !password) {
    //     return next(new ErrorHandler("Please Enter Email & Password", 400));
    // }
    // const user = await User.findOne({ email: req.body.email });
    // if (!user) return next(new ErrorHandler(404, "User not found!"));

    // //compare password
    // const isPasswordCorrect = await bcrypt.compare(
    //     req.body.password,
    //     user.password
    // );
    // if (!isPasswordCorrect)
    //     return next(new ErrorHandler(400, "Wrong password or username!"));

    // sendToken(user, 200, res); 

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

    const token = jwt.sign(
        { id: user.uuid, role: user.role },
        process.env.JWT_SECRET,
     // { expiresIn: process.env.JWT_EXPIRE}
    );
    //sendToken(user, 200, res);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'successfully login', role: user.role });

})