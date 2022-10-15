const { Schema, model } = require("mongoose");
const Auth = require("../auth/auth.model");

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
    unique: true,
  },
});

const findUserByNumber = async function (mobileNumber) {
  const foundUser = await this.findOne({ mobileNumber });
  console.log(foundUser);
  return foundUser;
};

const findUserByEmail = async function (email) {
  const foundUser = await this.findOne({ email });
  console.log(foundUser);
  return foundUser;
};

const createUser = async function (user) {
  try {
    const { firstName, lastName, email, password, mobileNumber } = user;
    const newUser = await this.create({
      firstName,
      lastName,
      email,
      mobileNumber,
    });

    await Auth.createAuth(newUser, password);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

userSchema.static("findUserByNumber", findUserByNumber);
userSchema.static("findUserByEmail", findUserByEmail);
userSchema.static("createUser", createUser);

module.exports = model("User", userSchema);
