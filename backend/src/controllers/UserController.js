import Users from "../models/Users.js";

class UserContoller {
  async changePassword(req, res) {
    try {
      const { password, newPassword, email } = req.body;

      if (!password || !newPassword) {
        return res
          .status(400)
          .json({ error: "A senha atual e a nova senha são obrigatórias" });
      }

      const user = await Users.findOne({ where: { email } });

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      user.password = newPassword;

      await user.save();

      return res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      console.log("Falha ao alterar sua senha", error);
      return res.status(500).json({ error: "Erro ao alterar senha", error });
    }
  }
}

export default new UserContoller();
