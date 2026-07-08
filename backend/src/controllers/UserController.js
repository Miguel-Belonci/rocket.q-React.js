import Users from "../models/Users.js";

class UserContoller {
  async profile(req, res) {
    try {
      const user = await Users.findByPk(req.userId, {
        attributes: ["id", "role", "email", "active"],
      });

      if (!user) {
        return res.status(404).json({ error: "usuario nao encontrado!" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.log("Falha ao retornar usuario autenticado", error);
      return res.status(500).json({ error: "Erro ao retornar usuario" });
    }
  }

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
        attributes: ["id", "role", "email", "active"],
      });

      return res.status(200).json({ users });
    } catch (error) {
      console.log("Falha ao retornar lista de usuários");
      return res.status(500).json({ error: "Erro ao encontrar usuários" });
    }
  }

  async handleUser(req, res) {
    try {
      const { userId } = req.body;

      const user = await Users.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: "usuário não encontrado!" });
      }

      user.active = !user.active;
      await user.save();

      return res
        .status(200)
        .json({
          message: `usuário ${user.active ? "reativado" : "inativado"} com sucesso!`,
        });
    } catch (error) {

      console.log("Falha ao gerenciar o acesso do usuário");
      return res
        .status(500)
        .json({
          error: `Erro ao gerenciar acesso do usuário usuário`,
        });
    }
  }
}

export default new UserContoller();
