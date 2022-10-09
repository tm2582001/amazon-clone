const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY


const signJwt = (payload,expiresIn)=>{
    return jwt.sign(payload,privateKey,{algorithm:'RS256',expiresIn});
};

module.exports = signJwt;