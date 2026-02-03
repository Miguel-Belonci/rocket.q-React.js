import express from "express";
import AuthMiddleware from "../../Middlewares/auth.js";
import UserContoller from "../controllers/UserController.js";

const router = express.Router();

router.post("/new-password", AuthMiddleware, UserContoller.changePassword);

export default router;
