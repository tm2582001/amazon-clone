const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userExist = async function(mobileNumber){
  const foundUser = await this.findOne({mobileNumber});
  console.log(foundUser);
  return foundUser;
}

userSchema.static('userExist',userExist);

// userSchema.statics.isValid = async function(){
// }

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

module.exports = model("User", userSchema);
