import express from "express";
import RegisterController from "../controllers/RegisterController.js";

const router = express.Router();

router.post("/create", RegisterController.create)

router.post("/auth", RegisterController.auth)

export default router;