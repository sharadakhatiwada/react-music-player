const express = require("express");
const userController = require("../controllers/userController");
const { validateRole } = require("../middleware/validateToken");
const userRouter = express.Router();

userRouter.post("/:userId", validateRole, userController.updateUser);
userRouter.get("/", validateRole, userController.getUser);
userRouter.get("/session/user", userController.getSessionUser);

module.exports = userRouter;
