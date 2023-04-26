// class UserPlaylist {
//   constructor(id, userId, musicId, orderId) {
//     this.id = id;
//     this.userId = userId;
//     this.musicId = musicId;
//     this.orderId = orderId;
//     this.urlPath = urlPath;
//   }
// }songId,

const mongoose = require("mongoose");
const playlistSchema = mongoose.Schema({
  userId: { type: String },
  songId: { type: String },
  orderId: { type: String },
  urlPath: { type: String },
  title: { type: String },
  urlPath: { type: String },
});
const PlaylistModel = mongoose.model("playlist", playlistSchema);
module.exports = PlaylistModel;
