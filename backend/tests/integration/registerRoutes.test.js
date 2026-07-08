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

describe("Register and protected routes", () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await truncateDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("creates a new user", async () => {
    const response = await request(app).post("/api/register/create").send({
      email: "new-user@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.users.email).toBe("new-user@example.com");
  });

  test("returns 409 when user already exists", async () => {
    await createUser({
      email: "teste432@gmail.com",
      role: "user",
    });

    const response = await request(app).post("/api/register/create").send({
      email: "teste432@gmail.com",
      password: "12345678",
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: "Esse usuário já existe",
    });
  });

  test("authenticates an active user and returns token", async () => {
    await createUser({
      email: "login@example.com",
      password: "12345678",
    });

    const response = await request(app).post("/api/register/auth").send({
      email: "login@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toMatchObject({
      email: "login@example.com",
      role: "user",
    });
  });

  test("blocks login when password is incorrect", async () => {
    await createUser({
      email: "student@example.com",
      password: "12345678",
    });

    const response = await request(app).post("/api/register/auth").send({
      email: "student@example.com",
      password: "88888888",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Usuário ou senha inválida",
    });
  });

  test("blocks login for inactive user", async () => {
    await createUser({
      email: "inactive@example.com",
      password: "12345678",
      active: false,
    });

    const response = await request(app).post("/api/register/auth").send({
      email: "inactive@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Sua conta está inativa!");
  });

  test("returns authenticated user profile when token is valid", async () => {
    const user = await createUser({
      email: "profile@example.com",
      password: "12345678",
      role: "admin",
    });

    const response = await request(app)
      .get("/api/user/me")
      .set("Authorization", authHeader(user));

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({
      id: user.id,
      email: "profile@example.com",
      role: "admin",
      active: true,
    });
    expect(response.body.user.password).toBeUndefined();
  });

  test("returns 401 when profile route has no token", async () => {
    const response = await request(app).get("/api/user/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Token not provided" });
  });
});
