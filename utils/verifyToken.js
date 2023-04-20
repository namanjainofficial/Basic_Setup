const ErrorHandler = require('./errorhandler')
const { createError } = require('./error')
const jwt = require('jsonwebtoken')

//verifytoken
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

//user or customer verification
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === 'customer') {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

//user or seller verfication
export const verifySeller = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 'seller') {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
}; 

//delivery

// admin verfication
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin === 'admin') {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };