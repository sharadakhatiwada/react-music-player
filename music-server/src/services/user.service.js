const mongoose = require("mongoose");
const { userDB } = require("../data/data");
const User = require("../models/user");

const updateUser = async (userId, updatedUser) => {
  const id = new mongoose.Types.ObjectId(userId);
  await User.findOneAndUpdate(
    { _id: id },
    { $set: { email: updatedUser.email, username: updatedUser.username } }
  );
  // console.log(userId);
  // const index = userDB.findIndex((u) => u.id === userId);
  // if (index > -1) {
  //   userDB[index] = {
  //     ...userDB[index],
  //     username: updatedUser.username,
  //     email: updatedUser.email,
  //   };
  // } else {
  //   throw new Error("Not Authorized");
  // }
  // return {
  //   id: userDB[index].id,
  //   username: userDB[index].username,
  //   playType: userDB[index].playType,
  // };
};
const getUser = async (userId) => {
  // if (userId) {
  //   const index = userDB.findIndex((u) => u.id === userId);
  //   return [userDB[index]];
  // } else {
  //   return userDB;
  // }
  if (userId) {
    const user = await User.findOne({ userId });
    return [user];
  } else {
    const users = await User.find();
    return users;
  }
};

module.exports = { updateUser, getUser };
