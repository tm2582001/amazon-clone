const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        // select: false  no more required
    }
});


const createAuth = async function(user,password){
    const hashPassword = password = await bcrypt.hash(password,12);
    const newAuth = new this({
        id:user,
        password: hashPassword
    }) ;
    await newAuth.save();
}

authSchema.static('createAuth',createAuth);


// another way of hashing password
// authSchema.pre("save", async function(next) {
//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password,12);
//     next();
// });


module.exports = model('Auth', authSchema);
