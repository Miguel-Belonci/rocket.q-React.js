import { Room, Question } from "../models/index.js";
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

      const room = await Room.create({ password, code });

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

  async Enter(req, res) {
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
        message: "Room was found succssfully",
      });
    } catch (error) {
      console.error("Error enter room", error);
      return res.status(500).json({ error: "Failed to enter room" });
    }
  }
}

export default new RoomController();
