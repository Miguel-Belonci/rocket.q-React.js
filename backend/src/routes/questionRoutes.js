import express from "express";
import QuestionController from "../controllers/QuestionController.js"

const router = express.Router()

// POST create a new quwstion
router.post("/create-question", QuestionController.create)

// router.delete("/:questionId", QuestionController.delete)

export default router