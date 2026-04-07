import { describe, expect, jest, test } from "@jest/globals";
import RegisterController from "../../src/controllers/RegisterController.js";

describe("Register Controller - create function", () => {
  test("should return 400 if email or password is missing", async () => {
    
    const req = {
      body: {
        email: "",
        password: "",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await RegisterController.create(req, res);

    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(res.json).toHaveBeenLastCalledWith({
      error: "Email e senha são obrigatórios",
    });
  });
});
