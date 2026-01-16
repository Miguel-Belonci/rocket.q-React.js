import express from "express";
import RoomController from "../controllers/RoomController.js";
import AuthMiddleware from "../../Middlewares/auth.js";

const router = express.Router();

// POST /api/rooms/create - Create a new room
router.post("/create", AuthMiddleware, RoomController.create);

router.get("/:code", AuthMiddleware, RoomController.enter);

router.delete("/delete", AuthMiddleware, RoomController.delete);

export default router;
