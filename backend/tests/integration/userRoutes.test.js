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

function authHeader(user) {
  return `Bearer ${jwt.sign({ id: user.id, role: user.role }, JWT_SECRET)}`;
}

describe("User routes", () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await truncateDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("should change the user's password", async () => {
    const user = await createUser({
      email: "test@example.com",
      password: "oldpassword",
    });

    authHeader(user);

    const response = await request(app)
      .post("/api/user/new-password")
      .set("Authorization", authHeader(user))
      .send({
        password: "oldpassword",
        newPassword: "newpassword",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Senha alterada com sucesso!");
  });

  test("should return 401 if the old password is incorrect", async () => {
    const user = await createUser({
      email: "test@example.com",
      password: "oldpassword",
    });

    const response = await request(app)
      .post("/api/user/new-password")
      .set("Authorization", authHeader(user))
      .send({
        password: "wrongpassword",
        newPassword: "newpassword",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Senha inválida" });
  });

  test("should return user`s profile", async () => {
    const user = await createUser({
      email: "teste@exemple.com",
    });

    const response = await request(app)
      .get("/api/user/me")
      .set("Authorization", authHeader(user));

    expect(response.status).toBe(200);
    expect(response.body.user.email).toEqual(user.email);
  });

  test("should return a list of users for administrators", async () => {
    const adminUser = await createUser({
      email: "admin@exemple.com",
      role: "admin",
    });

    const response = await request(app)
      .get("/api/user/users-list")
      .set("Authorization", authHeader(adminUser));

    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined();
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  test("should handle user activation/deactivation for administrators", async () => {
    const adminUser = await createUser({
      email: "admin@exemplecom",
      role: "admin",
    });

    const userToHandle = await createUser({
      email: "user@exemple.com",
      role: "user",
      active: false,
    });

    const response = await request(app)
      .patch("/api/user/handle-user")
      .set("Authorization", authHeader(adminUser))
      .send({ userId: userToHandle.id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`usuário reativado com sucesso!`);
  });
});
