const User = require('../../models/user/user.model');

const registerUser = async (req,res)=>{
    const {user} = req.body;

    console.log(user);
    const newUser = new User(user);
    await newUser.save();
    res.redirect('/');
};


module.exports = registerUser;