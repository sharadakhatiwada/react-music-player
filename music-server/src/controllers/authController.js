const authService = require("../services/auth.service");

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
