import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import AuthMiddleware from "../../Middlewares/auth.js";
const router = express.Router();

router.post("/create",  RegisterController.create);

router.post("/auth",  RegisterController.auth);

export default router;
