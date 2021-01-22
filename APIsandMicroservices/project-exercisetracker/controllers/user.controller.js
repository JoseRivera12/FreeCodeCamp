const userCtrl = {};

//Models
const User = require('../models/User');

//Create a new user receive username returns _id, username
userCtrl.newUser = async (req,res) => {
    const user = new User({username:req.body.username});
    const newUser = await user.save();
    res.json({username:newUser.username, _id:newUser._id})
};
  
//Returns array of all users
userCtrl.getUsers = async (req, res) => {
    const arr = await User.find();
    res.json(arr)
};

module.exports = userCtrl;