import express from "express";
import RoomController from "../controllers/RoomController.js";

const router = express.Router();

// POST /api/rooms/create - Create a new room
router.post("/create", RoomController.create);


export default router;





