import { json } from "sequelize";
import { Question, Room } from "../models/index.js";

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
        return res
          .status(400)
          .json({ error: "You need to write a question before submit" });
      }

      const question = await Question.create({ title: questionTitle, roomId });

      return res.status(201).json({
        question: question,
        id: question.id,
        message: "question created successfully",
      });
    } catch (error) {
      console.log("Error create a new question", error);
      return res
        .status(500)
        .json({ error: "Failed to create question", error });
    }
  }

  async read(req, res) {
    try {
      const { questionId, pass} = req.body;
      const question = await Question.findByPk(questionId, {
        include: { model: Room, as: "room" },
      });

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      if (!pass) {
        return res.status(400).json({ error: "Password is required" });
      }

      const isValidPassword = await question.room.checkPassword(pass);

      if (!isValidPassword) {
        return res.status(401).json({ error: "invalid password" });
      }
      question.isAnswered = true
      await question.save()

      res.status(200).json({ 
        message:"This question was read!",
        question: question
      })
    } catch (error) {
      console.log("Error read question",error)
      return res.status(500).json({error: "Failed to check question", error})
    }
  }
}

export default new QuestionController();
