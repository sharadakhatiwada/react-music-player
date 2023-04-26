const playlistService = require("../services/playlist.service");

const addToPlaylist = async (req, res, next) => {
  try {
    return res.json(
      await playlistService.addToPlaylist(req.user.id, req.body.songId)
    );
  } catch (error) {
    next(error);
  }
};

const removeFromPlaylist = async (req, res, next) => {
  try {
    return res.json(
      await playlistService.removeFromPlaylist(req.user.id, req.params.songId)
    );
  } catch (error) {
    next(error);
  }
};

const getPlaylist = async (req, res, next) => {
  try {
    return res.json(await playlistService.getPlaylist(req.user.id));
  } catch (error) {
    next(error);
  }
};

module.exports = { addToPlaylist, removeFromPlaylist, getPlaylist };
