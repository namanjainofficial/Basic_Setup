const catchAsyncErrors = require('../middleware/catchAsyncError');
const { Customer } = require('../models');


//get all users
exports.getAllCustomer = async (req,res,next)=>{
    try {
      const Customers = await Customer.findAll({});
      res.status(200).json(Customers);
    } catch (err) {
      next(err);
    }
  }

// //get single user
exports.getCustomer = async (req,res,next)=>{
    try {
      const uuid = req.params.uuid
      const customer = await Customer.findOne({ where: { uuid }});
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
}
  
// //delete user
exports.deleteCustomer = async (req, res,next) =>{
    const uuid = req.params.uuid;
  try {
    const customer = await Customer.findOne({ where: { uuid } })

    await customer.destroy()

    return res.json({ message: 'customer deleted!' })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
    next(err);
  }
}  