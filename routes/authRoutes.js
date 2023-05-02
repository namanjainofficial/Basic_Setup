const express = require('express')
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authCtrl');
const { verifySeller } = require('../utils/verifyToken');

//register
router.post("/register", registerUser)
//login
router.route("/login").post( loginUser )
//logout
router.get("/logout", logoutUser)

module.exports = router;