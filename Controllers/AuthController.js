const AuthService = require("../Services/AuthService");

class AuthController {
  static #service = new AuthService();
  static signUser = async (req, res) => {
    const user = req.body;
    try {
      console.log(user);
      const userData = await this.#service.signIn(user);
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  };
}

module.exports = AuthController;
