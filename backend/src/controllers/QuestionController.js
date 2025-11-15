import { Question } from "../models/index.js";

class QuestionController {
  async create(req, res) {

    console.log("REQ BODY:", req.body);


    try {
      const { questionTitle, roomId } = req.body;

      if (!roomId) {
        setError("Erro ao receber o id da sala");
        return;
      }

      if (!questionTitle) {
        res
          .status(400)
          .json({ error: "You need to write a question before submit" });
      }

      const question = await Question.create({ title: questionTitle, roomId });

      res.status(201).json({
        question: question,
        id: question.id,
        message: "question created successfully",
      });
    } catch (error) {
      console.log("Error create a new question", error);
      res.status(500).json({ error: "Failed to create question", error });
    }
  }
}

export default new QuestionController()
