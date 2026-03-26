import { jest } from "@jest/globals";
import GenerateCodeUnique from "../../src/config/utils/generateCode.js";

describe("GenerateCodeUnique", () => {
  test("returns a unique 5-digit code", async () => {
    const roomModelMock = {
      findOne: jest
        .fn()
        .mockResolvedValueOnce({ code: "12345" })
        .mockResolvedValueOnce(null),
    };

    const code = await GenerateCodeUnique(roomModelMock);

    expect(roomModelMock.findOne).toHaveBeenCalledTimes(2);
    expect(code).toMatch(/^\d{5}$/);
  });
});
