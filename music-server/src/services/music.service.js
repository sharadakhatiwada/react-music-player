const { musicDB } = require("../data/data");
const MusicModel = require("../models/music");

const getSongs = async (searchText) => {
  if (searchText) {
    return await MusicModel.find({
      title: { $regex: searchText, $options: "i" },
    });
  } else {
    return await MusicModel.find();
  }

  // let songs = musicDB;

  // if (searchText) {
  //   songs = musicDB.filter((m) =>
  //     m.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }
  // return songs;
};

module.exports = { getSongs };
