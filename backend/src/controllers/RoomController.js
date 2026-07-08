import { Room, Question, Users } from "../models/index.js";
import GenerateCodeUnique from "../config/utils/generateCode.js";

class RoomController {
  // Create a new room
  async create(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const code = await GenerateCodeUnique(Room);

      const room = await Room.create({ password, code, userId: req.userId });

      return res.status(201).json({
        id: room.id,
        code: room.code,
        message: "Room created successfully",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      return res.status(500).json({ error: "Failed to create room" });
    }
  }

  async list(req, res) {
    try {
      const { userId } = req.query;
      const where = userId ? { userId } : {};

      const rooms = await Room.findAll({
        where,
        attributes: ["id", "code", "userId", "createdAt", "updatedAt"],
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "email"],
          },
          {
            model: Question,
            as: "questions",
            attributes: ["id"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({ rooms });
    } catch (error) {
      console.error("Error listing rooms:", error);
      return res.status(500).json({ error: "Erro ao listar salas" });
    }
  }

  async enter(req, res) {
    try {
      const code = req.params.code;
      const room = await Room.findOne({
        where: { code },
        include: { model: Question, as: "questions" },
      });

      if (!room) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      return res.status(200).json({
        room: room,
        questions: room.questions,
        message: "Room was found successfully",
      });
    } catch (error) {
      console.error("Error enter room", error);
      return res.status(500).json({ error: "Failed to enter room" });
    }
  }

  async delete(req, res) {
    try {
      const { pass, code } = req.body;
      const room = await Room.findOne({
        where: { code },
        include: { model: Question, as: "questions" },
      });
      if (!code) {
        return res.status(400).json({ error: "Code is required" });
      }
      if (!pass) {
        return res.status(400).json({ error: "Password is required" });
      }
      if (!room) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      const isValidPassword = room.checkPassword(pass);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Senha inválida" });
      }
      await room.destroy();
      res.status(200).json({
        message: "sala excluída com sucesso",
      });
    } catch (error) {
      console.log("Erro ao excluir sala", error);
      return res
        .status(500)
        .json({ error: "Falha ao excluir esta sala", error });
    }
  }
}

export default new RoomController();
