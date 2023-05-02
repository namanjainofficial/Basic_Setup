const catchAsyncErrors = require('../middleware/catchAsyncError');
const { User } = require('../models');

//get all users
exports.getUsers = async (req,res,next)=>{
    try {
      const users = await User.findAll({});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

//get single user
exports.getUser = async (req,res,next)=>{
    try {
      const uuid = req.params.uuid
      const user = await User.findOne({ where: { uuid }});
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
}
  
//delete user
exports.deleteUser = async (req, res,next) =>{
    const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    next()
  }
}  