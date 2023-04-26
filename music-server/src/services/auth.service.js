const { compare, jwtSign, hash } = require("../utils/encryption");
const UserModel = require("../models/user");

const login = async (username, password) => {
  const currentUser = await UserModel.findOne({ email: username });
  //userDB.find((user) => user.email === username);

  if (!currentUser) {
    throw new Error("Invalid username!");
  }

  if (!compare(password, currentUser.password)) {
    throw new Error("Invalid password!");
  }

  const accessToken = jwtSign(currentUser);

  return {
    id: currentUser.id,
    username: currentUser.username,
    playType: currentUser.playType,
    accessToken,
  };
};

module.exports = { login };
