import express from "express";
import QuestionController from "../controllers/QuestionController.js";
import AuthMiddleware from "../../Middlewares/auth.js";
const router = express.Router();

// POST create a new quwstion
router.post("/create-question", AuthMiddleware, QuestionController.create);

router.delete("/delete-question", AuthMiddleware, QuestionController.delete);

router.put("/read-question", AuthMiddleware, QuestionController.read);

export default router;
