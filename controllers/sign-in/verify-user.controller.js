const User = require('../../models/user/user.model');
const ExpressError = require('../../utils/express-error/express-error.util');
const validateEmail = require('../../utils/validate-email/validate-email.util');

const signInTypes = {
    mobileNumber: 'mobile number',
    email: 'email'
}

const verifyUser = async(req,res)=>{
    let {signInId} = req.body;
    let signInType = null;

    if(!validateEmail(signInId)){
        if(!Number(signInId)) throw new ExpressError("Please enter data in valid format",400);
        else{
            signInType = signInTypes.mobileNumber;
            signInId = Number(signInId);
        } 
    }else signInType = signInTypes.email;

    let user = null;

    if(signInType === signInTypes.mobileNumber) user = await User.findUserByNumber(signInId);
    if(signInType === signInTypes.email) user = await User.findUserByEmail(signInId);

    if(!user) throw new ExpressError(`We cannot find an account with that ${signInType}`);

    console.log(user._id);

    res.render('pages/sign-in/verify-password',{
        signInId,
        user,
    });

};

module.exports = verifyUser;