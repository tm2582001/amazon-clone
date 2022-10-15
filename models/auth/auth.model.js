const { Schema, model } = require("mongoose");
const createAuth = require('../../services/auth/create-auth.service');

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


authSchema.static('createAuth',createAuth);


// another way of hashing password
// authSchema.pre("save", async function(next) {
//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password,12);
//     next();
// });


module.exports = model('Auth', authSchema);
