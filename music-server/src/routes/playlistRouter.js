const express = require("express");
const playlistControler = require("../controllers/playlistController");

const playlistRouter = express.Router();

playlistRouter.post("/", playlistControler.addToPlaylist);
playlistRouter.delete("/:songId", playlistControler.removeFromPlaylist);
playlistRouter.get("/", playlistControler.getPlaylist);

module.exports = playlistRouter;
