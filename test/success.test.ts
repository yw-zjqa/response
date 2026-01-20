import { describe, it, expect } from "vitest";
import { success } from "../src";

describe("success()", () => {
  it("returns default success response", () => {
    const res = success();

    expect(res.code).toBe(200);
    expect(res.message).toBe("操作成功");
    expect(res.data).toBeUndefined();
    expect(typeof res.timestamp).toBe("number");
  });

  it("returns success with data", () => {
    const data = { id: 1 };
    const res = success(data);

    expect(res.data).toEqual(data);
  });

  it("overrides code and message", () => {
    const data = { id: 1 };
    const res = success(data, {
      code: 201,
      message: "Created",
    });

    expect(res.code).toBe(201);
    expect(res.message).toBe("Created");
  });
});
