import Users from "../models/Users.js";

class RegisterController {
  async create(req, res) {
    console.log("BODY RECEBIDO:", req.body);
    try {
      const { email, password } = req.body;

      if (!password || !email) {
        return res
          .status(400)
          .json({ error: "Password and Email are required" });
      }

      const isuser = await Users.findOne({
        where: { email },
      });

      if (isuser) {
        return res.status(409).json({ error: "Esse usuário já existe" });
      }

      const user = await Users.create({ password, email });

      return res.status(201).json({
        users: user,
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  }

  async auth (req, res) {
    try {
      const {email, password} = req.body

      if (!password || !email) {
        return res
          .status(400)
          .json({ error: "Password and Email are required" });
      }

      const user = await Users.findOne({
        where: {email}
      })

      if(!user){
        return res.status(401).json({error: "Úsuário ou senha inválida"})
      }

      const isValidPassword = user.checkPassword(password)
      if (!isValidPassword) {
       return res.status(401).json({error: "Usuário ou senha inválida"})
      }

    } catch (error) {
      console.log("Erro ao acessar sua conta", error);
      return res
        .status(500)
        .json({ error: "Falha ao fazer login", error });
    }
  }
}

export default new RegisterController();
