const Auth = require('../../models/auth/auth.model');
const User = require('../../models/user/user.model');
const ExpressError = require('../../utils/express-error/express-error.util');
const signJwt = require('../../utils/jwt/sign-jwt.util');

const verifyPassword = async(req,res)=>{
    const {user} = req.body;
    
    const isValidUser = await Auth.verifyAuth(user);
    
    if(!isValidUser)  throw new ExpressError('Invalid password', 401);

    const userData = await User.findById(user.id);

    if(!userData) throw new ExpressError('Invalid user id', 401);

    const {mobileNumber,email,firstName,lastName} = userData;

    const accessToken = signJwt({mobileNumber,email,firstName,lastName},'30m');
    
    res.cookie("accessToken",accessToken,{
        maxAge: 300000,
        httpOnly: true
    });

    res.redirect('/');
}

module.exports = verifyPassword;