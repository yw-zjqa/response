import type { BaseResult, ResultOptions } from "./types";

export function success(): BaseResult<undefined>;
export function success<T>(data: T): BaseResult<T>;
export function success<T>(data: T, options: ResultOptions): BaseResult<T>;

export function success<T>(data?: T, options: ResultOptions = {}): BaseResult<T> {
  const { code = 200, message = "操作成功" } = options;

  return {
    code,
    message,
    timestamp: Date.now(),
    data: data as T,
  };
}
