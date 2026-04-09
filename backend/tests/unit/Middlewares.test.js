import { describe, expect, jest, test } from "@jest/globals";
import jwt from "jsonwebtoken";
import AuthMiddleware from "../../src/Middlewares/auth.js";
import RoleMiddleware from "../../src/Middlewares/role.js";

describe("AuthMiddleware", () => {
  test("adds user data to request and calls next when token is valid", () => {
    const token = jwt.sign({ id: 7, role: "admin" }, process.env.JWT_SECRET);

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    AuthMiddleware(req, res, next);

    expect(req.userId).toBe(7);
    expect(req.userRole).toBe("admin");
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("returns 401 when token is missing", () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token not provided" });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("RoleMiddleware", () => {
  test("should calls next when user role isn`t admin", () => {
     const token = jwt.sign({ id: 14, role: "admin" }, process.env.JWT_SECRET);

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    RoleMiddleware(req,res,next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ error: "Não autorizado!"})
    expect(next).not.toHaveBeenCalled();
  })
})
