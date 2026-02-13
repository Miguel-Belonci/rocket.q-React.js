import Users from "../models/Users.js";

class UserContoller {
  async changePassword(req, res) {
    try {
      const { password, newPassword } = req.body;
      const id = req.userId;

      if (!password || !newPassword) {
        return res
          .status(400)
          .json({ error: "A senha atual e a nova senha são obrigatórias" });
      }

      const user = await Users.findOne({ where: { id } });

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

  async getUsers(req, res) {
    try {
      const users = await Users.findAll({
        attributes: ["id", "role", "email"],
      });

      return res.status(200).json({ users });
    } catch (error) {
      console.log("Falha ao retornar lista de usuários");
      return res.status(500).json({ error: "Erro ao encontrar usuários" });
    }
  }
}

export default new UserContoller();
