import express from "express";
import QuestionController from "../controllers/QuestionController.js"

const router = express.Router()

// POST create a new quwstion
router.post("/create-question", QuestionController.create)

router.delete("/delete-question", QuestionController.delete)

router.put("/read-question", QuestionController.read)

export default router