const deserializedUser = (req,res,next)=>{
    const {accessToken} = req.cookies;
    if(accessToken) req.user = accessToken;
    next();
};

module.exports = deserializedUser;