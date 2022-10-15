const User = require('../../models/user/user.model');
const Auth = require('../../models/auth/auth.model');
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

    if(email){
        const isemail = await User.findUserByEmail(email);
        if(isemail) throw new ExpressError('Email already exist',400);
    }

    const isUser = await User.findUserByNumber(user.mobileNumber);

    if(isUser){
        const isAuth = await Auth.findOne({id:isUser._id});
        if(isAuth) throw new ExpressError('Mobile Number alreay exist',400);
    }

    let firstName = name.substring(0, name.indexOf(' '));
    let lastName = name.substring(name.indexOf(' ') + 1);

    if(!firstName){
        firstName = lastName;
        lastName = "";
    }

    const newUser = {
        firstName,
        lastName,
        mobileNumber,
        email,
        password
    }

    if(isUser){
        await Auth.createAuth(isUser,password);
    }else{
        await User.createUser(newUser);
    }
    
    const accessToken = signJwt({mobileNumber,email,firstName,lastName},'30m');
    
    res.cookie("accessToken",accessToken,{
        maxAge: 300000,
        httpOnly: true
    });

    res.redirect('/');
};


module.exports = registerUser;