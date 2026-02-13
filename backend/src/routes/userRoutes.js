import express from "express";
import AuthMiddleware from "../../Middlewares/auth.js";
import RoleMiddleware from "../../Middlewares/role.js"
import UserContoller from "../controllers/UserController.js";

const router = express.Router();

router.post("/new-password", AuthMiddleware, UserContoller.changePassword);

router.get("/users-list", AuthMiddleware, RoleMiddleware, UserContoller.getUsers)

export default router;
