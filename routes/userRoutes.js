const express = require('express');
const { getUsers, getUser, deleteUser } = require('../controllers/userCtrl');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

//get all users
router.get('/', getUsers);
//get single user
router.get('/:uuid', getUser);
//delete user
router.get('/:uuid', deleteUser)

module.exports = router;