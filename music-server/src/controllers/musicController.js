const musicService = require("../services/music.service");

const getSongs = async (req, res, next) => {
  try {
    return res.json(await musicService.getSongs(req.query.search));
  } catch (error) {
    next(error);
  }
};

module.exports = { getSongs };
