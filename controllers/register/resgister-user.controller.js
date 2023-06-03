const User = require('../../models/user/user.model');
const ExpressError = require('../../utils/express-error/express-error.util');
const signJwt = require('../../utils/jwt/sign-jwt.util');
const validateEmail = require('../../utils/validate-email/validate-email.util');

const registerUser = async (req,res)=>{
    const {user} = req.body;
    if(!user) throw new ExpressError('Data is missing',400);

    const {mobileNumber, email, password, name} = user;

    if(!Number(mobileNumber)) throw new ExpressError('Invalid mobile no',400);

    if(email && !validateEmail(email)) throw new ExpressError('Invalid Email Address',400);

    if(!name) throw new ExpressError('Name is required',400);

    if(!password) throw new ExpressError('Password is required',400);

    const isUser = await User.userExist(user.mobileNumber);
    if(isUser){
        throw new ExpressError('Mobile Number already exist',400);
    }

    const newUser = new User(user);
    await newUser.save();
    
    const accessToken = signJwt({mobileNumber,email,name},'30m');
    
    res.cookie("accessToken",accessToken,{
        maxAge: 300000,
        httpOnly: true
    });

    res.redirect('/');
};


module.exports = registerUser;