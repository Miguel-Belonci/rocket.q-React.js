import request from "supertest";
import app from "../../src/app.js";
import {
  closeDatabase,
  createUser,
  syncDatabase,
  truncateDatabase,
} from "../setup/testDatabase.js";
import { Room, Question } from "../../src/models/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/config/auth.js";

function authUser(user) {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return `Bearer ${token}`;
}

describe("Question Routes", () => {
  let user;
  let authHeader;

  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await truncateDatabase();

    user = await createUser({ username: "testuser", password: "password" });
    authHeader = authUser(user);
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("should create a new question for an authenticated user", async () => {
    await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });
    const response = await request(app)
      .post("/api/questions/create-question")
      .set("Authorization", authHeader)
      .send({
        questionTitle: "What is the capital of France?",
        code: 123456,
      });

    console.log("Response body:", response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("question");
    expect(response.body.question).toHaveProperty("id");
    expect(response.body.question).toHaveProperty(
      "title",
      "What is the capital of France?",
    );
  });

  test("should return 400 if question title is missing", async () => {
    await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });
    const response = await request(app)
      .post("/api/questions/create-question")
      .set("Authorization", authHeader)
      .send({
        code: 123456,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "você precisa escrever uma pergunta antes de enviar o formulário",
    );
  });

  test("should read a question with valid password", async () => {
    const room = await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });
    const question = await Question.create({
      title: "What is the capital of France?",
      code: 123456,
      roomId: room.id,
    });
    const response = await request(app)
      .put("/api/questions/read-question")
      .set("Authorization", authHeader)
      .send({
        questionId: question.id,
        pass: "12345678",
      });

    console.log("Response body:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("question");
    expect(response.body.question).toHaveProperty(
      "title",
      "What is the capital of France?",
    );
    expect(response.body.question).toHaveProperty("isAnswered", true);
  });

  test("should delete a question with valid password", async () => {
    const room = await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });
    const question = await Question.create({
      title: "What is the capital of France?",
      code: 123456,
      roomId: room.id,
    });
    const response = await request(app)
      .delete("/api/questions/delete-question")
      .set("Authorization", authHeader)
      .send({
        questionId: question.id,
        pass: "12345678",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "questão excluída com sucesso!",
    );
  });
});
