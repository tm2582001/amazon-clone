const findUserByNumber = async function (mobileNumber) {
  const foundUser = await this.findOne({ mobileNumber });
  console.log(foundUser,'here');
  return foundUser;
};

const findUserByEmail = async function (email) {
  const foundUser = await this.findOne({ email });
  console.log(foundUser);
  return foundUser;
};


module.exports = {
    findUserByEmail,
    findUserByNumber
}