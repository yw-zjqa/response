export interface BaseResult<T = undefined> {
  code: number;
  message: string;
  timestamp: number;
  data: T;
  cause?: unknown;
}

export interface ResultOptions {
  code?: number;
  message?: string;
}

export interface ErrorOptions extends ResultOptions {
  /**
   * 是否暴露真实错误信息给客户端
   * 默认 true（开发环境友好）
   */
  expose?: boolean;

  /**
   * 原始错误对象
   */
  cause?: unknown;
}
