import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import AuthMiddleware from "../../Middlewares/auth.js";

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
