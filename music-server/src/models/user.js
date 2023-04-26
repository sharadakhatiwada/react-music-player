// class User {
//   constructor(id, username, email, password, playType) {
//     this.id = id;
//     this.username = username;
//     this.email = email;
//     this.password = password;
//     this.playType = playType;
//   }
// }
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  playType: { type: String },
  role: { type: String, enum: ["admin", "user"] },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
