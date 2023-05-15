const express = require('express')
const router = express.Router();
const { registerCustomer, loginCustomer, logoutCustomer } = require('../controllers/authCtrl');
//const { verifySeller } = require('../utils/verifyToken');

//register
router.post("/register", registerCustomer)
//login
router.route("/login").post( loginCustomer )
//logout
router.get("/logout", logoutCustomer)

module.exports = router;