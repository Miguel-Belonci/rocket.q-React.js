import Users from "../models/Users.js";

class UserContoller {
  async changePassword(req, res) {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res
        .status(400)
        .json({ error: "A senha atual e a nova senha são obrigatórias" });
    }
  }
}

export default new UserContoller();
