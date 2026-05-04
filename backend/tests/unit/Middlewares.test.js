import { describe, expect, jest, test } from "@jest/globals";
import jwt from "jsonwebtoken";
import AuthMiddleware from "../../src/Middlewares/auth.js";
import RoleMiddleware from "../../src/Middlewares/role.js";
import Users from "../../src/models/Users.js";
import { JWT_SECRET } from "../../src/config/auth.js";

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("AuthMiddleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("adds current user data to request and calls next when token is valid", async () => {
    const token = jwt.sign({ id: 7, role: "user" }, JWT_SECRET);
    const user = { id: 7, email: "admin@gmail.com", role: "admin", active: true };
    jest.spyOn(Users, "findByPk").mockResolvedValueOnce(user);

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = createResponse();
    const next = jest.fn();

    await AuthMiddleware(req, res, next);

    expect(Users.findByPk).toHaveBeenCalledWith(7, {
      attributes: ["id", "email", "role", "active"],
    });
    expect(req.userId).toBe(7);
    expect(req.userRole).toBe("admin");
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("returns 401 when token is missing", async () => {
    const req = { headers: {} };
    const res = createResponse();
    const next = jest.fn();

    await AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token not provided" });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when token user does not exist anymore", async () => {
    const token = jwt.sign({ id: 999 }, JWT_SECRET);
    jest.spyOn(Users, "findByPk").mockResolvedValueOnce(null);

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = createResponse();
    const next = jest.fn();

    await AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token invalid" });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when token user is inactive", async () => {
    const token = jwt.sign({ id: 8 }, JWT_SECRET);
    jest.spyOn(Users, "findByPk").mockResolvedValueOnce({
      id: 8,
      email: "inactive@gmail.com",
      role: "user",
      active: false,
    });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = createResponse();
    const next = jest.fn();

    await AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Conta inativa" });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("RoleMiddleware", () => {
  test("calls next when user role is admin", async () => {
    const req = {
      userRole: " admin ",
    };
    const res = createResponse();
    const next = jest.fn();

    await RoleMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("returns 403 when user role is not admin", async () => {
    const req = {
      userRole: "user",
    };
    const res = createResponse();
    const next = jest.fn();

    await RoleMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Não autorizado!" });
    expect(next).not.toHaveBeenCalled();
  });
});
