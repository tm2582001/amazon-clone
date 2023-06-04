const bcrypt = require('bcrypt');

const verifyAuth = async function(user){
    if(!(user.id && user.password)) return false;
    const userAuth = await this.findOne({id: user.id});
    if(!userAuth) return false;
    const isValidUser = await bcrypt.compare(user.password, userAuth.password);
    return isValidUser;
}

module.exports = verifyAuth;