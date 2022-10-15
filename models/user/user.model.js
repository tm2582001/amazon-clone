const { Schema, model } = require("mongoose");
const {findUserByEmail, findUserByNumber} = require("../../services/user/find-user.service");
const createUser = require('../../services/user/create-user.service');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,

  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
});

userSchema.static("findUserByNumber", findUserByNumber);
userSchema.static("findUserByEmail", findUserByEmail);
userSchema.static("createUser", createUser);

module.exports = model("User", userSchema);
