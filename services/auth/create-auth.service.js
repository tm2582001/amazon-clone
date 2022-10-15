const bcrypt = require("bcrypt");

const createAuth = async function(user,password){
    const hashPassword = password = await bcrypt.hash(password,12);
    const newAuth = new this({
        id:user,
        password: hashPassword
    }) ;
    await newAuth.save();
}

module.exports = createAuth;