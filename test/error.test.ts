import { describe, it, expect } from "vitest";
import { error } from "../src";

describe("error()", () => {
  it("returns default error", () => {
    const res = error();

    expect(res.code).toBe(500);
    expect(res.message).toBe("操作失败");
    expect(res.data).toBeNull();
  });

  it("returns error with custom message and code", () => {
    const res = error("Not found", { code: 404 });

    expect(res.code).toBe(404);
    expect(res.message).toBe("Not found");
  });

  it("hides error message when expose=false", () => {
    const res = error(new Error("DB down"), {
      expose: true,
    });

    expect(res.message).toBe("DB down");
  });
});
