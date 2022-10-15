const Auth = require("../../models/auth/auth.model");

const createUser = async function (user) {
  try {
    const { firstName, lastName, email, password, mobileNumber } = user;
    const newUser = await this.create({
      firstName,
      lastName,
      email: email,
      mobileNumber,
    });

    await Auth.createAuth(newUser, password);
    return newUser;
  } catch (err) {
    throw err;
  }
};

module.exports = createUser;