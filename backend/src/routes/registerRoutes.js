import express from "express";
import RegisterController from "../controllers/RegisterController.js";

const router = express.Router();

router.post("/create", RegisterController.create)

router.get("/auth", RegisterController.auth)

export default router;