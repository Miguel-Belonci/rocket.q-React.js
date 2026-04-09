import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import RegisterController from "../../src/controllers/RegisterController.js";

function mockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

function emptyBody() {
  return {
    body: {
      email: "",
      password: "",
    },
  };
}

describe("Register Controller - create", () => {
  let res;
  let req;

  beforeEach(() => {
    res = mockResponse();
    req = emptyBody();
  });

  test("Should return 400 if email or password is missing", async () => {
    await RegisterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email e senha são obrigatórios",
    });
  });

  describe("Register Controller - auth", () => {
    test("Should return 400 if email or password is missing", async () => {
      await RegisterController.auth(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email e senha são obrigatórios",
      });
    });
  });
});
