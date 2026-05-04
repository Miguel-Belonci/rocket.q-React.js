import express from "express";
import RoomController from "../controllers/RoomController.js";
import AuthMiddleware from "../Middlewares/auth.js";
import RoleMiddleware from "../Middlewares/role.js";

const router = express.Router();

router.post("/create", AuthMiddleware, RoomController.create);

router.get("/admin/list", AuthMiddleware, RoleMiddleware, RoomController.list);

router.get("/:code", AuthMiddleware, RoomController.enter);

router.delete("/delete", AuthMiddleware, RoomController.delete);

export default router;
