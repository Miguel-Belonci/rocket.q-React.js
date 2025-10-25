import { Room } from "../models/index.js";

class RoomController {
  // Create a new room
  async create(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const room = await Room.create({ password});

      res.status(201).json({
        id: room.id,
        message: "Room created successfully",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  }

}

export default new RoomController();




