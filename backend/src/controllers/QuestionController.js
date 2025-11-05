import { Question } from "../models";

class QuestionController {

    async create(req, res) {
        try {
            const { questionTitle, roomId } = req.body

            if(!questionTitle){res.status(400).json({error: "You need to write a question before submit"})}

            const question = await Question.create({questionTitle, roomId})

            res.status(201).json({
                id: question.id,
                message: "question created successfully"
            })
        } catch (error) {
            console.log("Error create a new question", error)
            res.status(500).json({error: "Failed to create question"})
        }
    }
}