const jwt = require('jsonwebtoken')
const { createError } = require('../utils/error')

const checkLogin = (req, res, next) =>{
    // get authorization header
    let authHeader = req.header('Authorization');
    //verify jwt token
    jwt.verify( authHeader, process.env.JWT_SECRET, (err, user ) => {
        if (err) return next(createError(401, "session is not valid.. please login again!"));
        req.userData = user;
        next();
    });
}

module.exports = { checkLogin };