import request from "supertest";
import app from "../../src/app.js";
import { closeDatabase, createUser, syncDatabase, truncateDatabase } from "../setup/testDatabase.js";

describe("Register routes", () => {
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

  test("should return 409 if user already exists", async () => {
    await createUser({
      email:"teste432@gmail.com",
    })

    const response = await request(app).post("/api/register/create").send({
      email: "teste432@gmail.com",
      password: "12345678"
    })

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: "Esse usuário já existe"
    })
  })

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
  test("block login because incorrect password", async () => {
    await createUser({
      password:"12345678"
    })

    const response = await request(app).post("/api/register/auth").send({
      email:"student@example.com",
      password:"88888888",
    })

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Usuário ou senha inválida"
    })

  })
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
});
