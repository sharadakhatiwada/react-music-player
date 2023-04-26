const uuid = require("uuid");
const { playlistDB, musicDB } = require("../data/data");
const mongoose = require("mongoose");
const PlaylistModel = require("../models/playlist");
const MusicModel = require("../models/music");

const addToPlaylist = async (userId, songId) => {
  let result = await PlaylistModel.findOne({ userId, songId });
  if (!result) {
    let count = await PlaylistModel.count();
    const id = new mongoose.Types.ObjectId(songId);
    let song = await MusicModel.findOne({ _id: id });
    const newPlaylistData = {
      id: uuid.v4(),
      userId,
      songId,
      orderId: count + 1,
      title: song.title,
      urlPath: song.urlPath,
    };
    const songObj = new PlaylistModel(newPlaylistData);
    await songObj.save();
  }
  return await PlaylistModel.find({ userId });
  // let result = playlistDB
  //   .filter((p) => p.userId === userId)
  //   .sort((a, b) => (a.orderId > b.orderId ? 1 : -1));
  // const index = playlistDB.findIndex(
  //   (p) => p.songId === songId && p.userId === userId
  // );
  // // add only if not present
  // let song = musicDB.find((m) => m.id === songId);
  // if (index === -1) {
  //   const newPlaylistData = {
  //     id: uuid.v4(),
  //     userId,
  //     songId,
  //     orderId: result.length + 1,
  //     title: song.title,
  //     urlPath: song.urlPath,
  //   };
  //   playlistDB.push(newPlaylistData);
  //   result.push(newPlaylistData);
  //return result;
  // }
};

const removeFromPlaylist = async (userId, songId) => {
  console.log(songId);
  await PlaylistModel.deleteOne({ userId, songId });
  // const index = playlistDB.findIndex(
  //   (p) => p.songId === songId && p.userId === userId
  // );
  // console.log(index);

  // if (index > -1) {
  //   playlistDB.splice(index, 1);
  // }
  // const tempPlaylistForUser = playlistDB
  //   .filter((p) => p.userId === userId)
  //   .sort((a, b) => (a.orderId > b.orderId ? 1 : -1));

  // // re order the playlist
  // for (let i = 1; i <= tempPlaylistForUser.length; i++) {
  //   playlistDB.find((p) => p.id === tempPlaylistForUser[i - 1].id).orderId = i;
  // }
  return await PlaylistModel.find({ userId });
};

const getPlaylist = async (userId) => {
  if (userId) {
    return await PlaylistModel.find({ userId });
  } else {
    return await PlaylistModel.find();
  }
};

module.exports = { addToPlaylist, removeFromPlaylist, getPlaylist };
