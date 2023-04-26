// class Music {
//   constructor(id, title, releaseDate, urlPath) {
//     this.id = id;
//     this.title = title;
//     this.releaseDate = releaseDate;
//     this.urlPath = urlPath;
//   }
// }
const mongoose = require("mongoose");
const musicSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  releaseDate: { type: Date },
  urlPath: { type: String },
});
const MusicModel = mongoose.model("music", musicSchema);
module.exports = MusicModel;
