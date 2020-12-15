const AuthRepository = require("../Repositories/AuthRepository.js");
class AuthService {
  #repository = new AuthRepository();
  signIn = async (user) => {
    const firebaseUser = await this.#repository.signOrCreate(user);
    return {
      id: firebaseUser.uid,
      name: user.name,
      email: user.email,
    };
  };
}

module.exports = AuthService;
