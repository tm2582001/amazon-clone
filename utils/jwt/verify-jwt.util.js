const jwt = require('jsonwebtoken');

const publicKey = process.env.PUBLIC_KEY;

const verifyJwt = (token)=>{
    try{
        const decoded = jwt.verify(token,publicKey);
        return { payload: decoded, expired: false };

    }catch(err){
        return { payload: null, expired: err.message.includes("jwt expired") };
    }
}

export default verifyJwt;