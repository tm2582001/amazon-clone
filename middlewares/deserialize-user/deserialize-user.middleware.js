const verifyJwt = require("../../utils/jwt/verify-jwt.util");

const deserializedUser = (req,res,next)=>{
    const {accessToken} = req.cookies;

    if(!accessToken) return next();

    const {payload, expired} = verifyJwt(accessToken);
    if(payload) req.user = payload;
    next();
};

module.exports = deserializedUser;