import { json } from "sequelize";
import { Question, Room } from "../models/index.js";

class QuestionController {
  async create(req, res) {
    try {
      const { questionTitle, code } = req.body;
      const room = await Room.findOne({ where: { code } });

      if (!room.id) {
        setError("Erro ao receber o id da sala");
        return;
      }

      if (!questionTitle) {
        return res.status(400).json({
          error:
            "você precisa escrever uma pergunta antes de enviar o formulário",
        });
      }

      const question = await Question.create({ title: questionTitle, roomId: room.id });

      return res.status(201).json({
        question: question,
        id: question.id,
        message: "questão criada com sucesso!",
      });
    } catch (error) {
      console.log("Erro ao criar questão", error);
      return res.status(500).json({ error: "Falha ao criar questão", error });
    }
  }

  async read(req, res) {
    try {
      const { questionId, pass } = req.body;

      const question = await Question.findByPk(questionId, {
        include: { model: Room, as: "room" },
      });

      if (!question) {
        return res.status(404).json({ error: "Questâo não encontrada" });
      }

      if (!pass) {
        return res.status(400).json({ error: "A senha é obrigatória" });
      }

      const isValidPassword = await question.room.checkPassword(pass);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      question.isAnswered = true;
      await question.save();

      res.status(200).json({
        message: "This question was read!",
        question: question,
      });
    } catch (error) {
      console.log("Erro ao ler questão", error);
      return res
        .status(500)
        .json({ error: "Falha ao marcar como lida esta pergunta", error });
    }
  }

  async delete(req, res) {
    try {
      const { questionId, pass } = req.body;

      const question = await Question.findByPk(questionId, {
        include: { model: Room, as: "room" },
      });

      if (!question) {
        return res.status(404).json({ error: "Questâo não encontrada" });
      }

      if (!pass) {
        return res.status(400).json({ error: "A senha é obrigatória" });
      }

      const isValidPassword = await question.room.checkPassword(pass);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      await question.destroy();

      res.status(200).json({
        message: "questão excluída com sucesso!",
      });
    } catch (error) {
      console.log("Erro ao excluir pergunta", error);
      return res
        .status(500)
        .json({ error: "Erro ao excluir esta pergunta", error });
    }
  }
}

export default new QuestionController();
