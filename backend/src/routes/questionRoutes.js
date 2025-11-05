import express from "express";
import QuestionController from "../controllers/QuestionController"

const router = express.Router()

// POST create a new quwstion
router.post("/create-question", QuestionController.create)

export default router