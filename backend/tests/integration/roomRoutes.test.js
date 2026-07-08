import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app.js";
import {
  closeDatabase,
  createUser,
  syncDatabase,
  truncateDatabase,
} from "../setup/testDatabase.js";
import { JWT_SECRET } from "../../src/config/auth.js";
import { Question, Room } from "../../src/models/index.js";

function authHeader(user) {
  return `Bearer ${jwt.sign({ id: user.id, role: user.role }, JWT_SECRET)}`;
}

describe("Room routes", () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await truncateDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("creates a new room for authenticated user", async () => {
    const user = await createUser({
      email: "user@exemple.com",
      role: "user",
    });

    const response = await request(app)
      .post("/api/rooms/create")
      .set("Authorization", authHeader(user))
      .send({
        password: "12345678",
      });

    expect(response.status).toBe(201);
    expect(response.body.code).toEqual(expect.any(String));
  });

  test("enters an existing room by code for authenticated user", async () => {
    const user = await createUser({
      email: "user@exemple.com",
      role: "user",
    });
    const room = await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });

    const response = await request(app)
      .get(`/api/rooms/${room.code}`)
      .set("Authorization", authHeader(user))
      .send({
        code: room.code,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Room was found successfully",
      room: expect.objectContaining({ code: room.code }),
      questions: [],
    });
  });

  test("deletes a room for authenticated user", async () => {
    const user = await createUser({
      email: "user@exemple.com",
      role: "user",
    });
    const room = await Room.create({
      password: "12345678",
      code: 123456,
      userId: user.id,
    });

    const response = await request(app)
      .delete(`/api/rooms/delete`)
      .set("Authorization", authHeader(user))
      .send({
        pass: "12345678",
        code: room.code,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "sala excluída com sucesso" });
  });

  test("lists rooms with owner and question data for admin users", async () => {
    const admin = await createUser({
      email: "admin@example.com",
      role: "admin",
    });
    const owner = await createUser({
      email: "owner@example.com",
      role: "user",
    });
    const anotherOwner = await createUser({
      email: "another-owner@example.com",
    });

    const ownerRoom = await Room.create({
      password: "12345678",
      code: 12345,
      userId: owner.id,
    });
    await Room.create({
      password: "12345678",
      code: 54321,
      userId: anotherOwner.id,
    });
    await Question.create({
      title: "How does auth work?",
      roomId: ownerRoom.id,
      isAnswered: false,
    });

    const response = await request(app)
      .get(`/api/rooms/admin/list?userId=${owner.id}`)
      .set("Authorization", authHeader(admin));

    expect(response.status).toBe(200);
    expect(response.body.rooms).toHaveLength(1);
    expect(response.body.rooms[0]).toMatchObject({
      code: 12345,
      userId: owner.id,
      user: {
        id: owner.id,
        email: "owner@example.com",
      },
    });
    expect(response.body.rooms[0].questions).toHaveLength(1);
  });

  test("blocks normal users from admin room list", async () => {
    const user = await createUser({
      email: "normal-user@example.com",
      role: "user",
    });

    const response = await request(app)
      .get("/api/rooms/admin/list")
      .set("Authorization", authHeader(user));

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Não autorizado!" });
  });
});
