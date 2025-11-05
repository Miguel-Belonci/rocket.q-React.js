import { Room, Question } from "../models/index.js";

class RoomController {
  // Create a new room
  async create(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const room = await Room.create({ password });

      res.status(201).json({
        id: room.id,
        message: "Room created successfully",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  }

  async Enter(req, res) {
    try {
      const roomId = req.params.roomId;
      const room = await Room.findByPk(roomId, {
        include:{model: Question, as: "questions"}
      });

      if (!room) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      res.status(200).json({
        room: room,
        message: "Room was found succssfully",
      });
    } catch (error) {
      console.error("Error enter room", error);
      res.status(500).json({ error: "Failed to enter room" });
    }
  }
}

export default new RoomController();
