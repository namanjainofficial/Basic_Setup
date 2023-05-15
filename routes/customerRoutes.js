const express = require('express');
const { getAllCustomer, getCustomer, deleteCustomer } = require('../controllers/customerCtrl');
const { verifyCustomer } = require('../utils/verifyToken');
const { checkLogin } = require('../utils/common')
const router = express.Router();


// router.get('/checkauth/:uuid', verifyCustomer, (req, res) =>{
//     res.send(" hello user you can delete your account")
// })
//get all users
router.get('/', getAllCustomer);
//get single user
router.get('/:uuid',checkLogin, getCustomer);
//delete user
router.delete('/:uuid',verifyCustomer, deleteCustomer);

module.exports = router;