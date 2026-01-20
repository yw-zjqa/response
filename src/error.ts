import type { BaseResult, ErrorOptions } from "./types";

function normalizeErrorMessage(input?: unknown): string {
  if (!input) return "操作失败";

  if (typeof input === "string") return input;

  if (input instanceof Error) return input.message;

  try {
    return JSON.stringify(input);
  } catch {
    return "操作失败";
  }
}

export function error(): BaseResult<null>;
export function error(message: string): BaseResult<null>;
export function error(err: unknown): BaseResult<null>;
export function error(err: unknown, options: ErrorOptions): BaseResult<null>;

export function error(err?: unknown, options: ErrorOptions = {}): BaseResult<null> {
  const { code = 500, message, expose = true, cause } = options;

  const rawMessage = normalizeErrorMessage(err);
  const finalMessage = message ?? (expose ? rawMessage : "系统异常，请稍后再试");

  return {
    code,
    message: finalMessage,
    timestamp: Date.now(),
    data: null,
    cause: cause ?? err,
  };
}
