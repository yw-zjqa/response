# @ywzjqa/response

> A lightweight, type-safe response formatter for Node.js and frontend projects.

`@yw_zjqa/response` helps you standardize API responses with clean TypeScript types and a simple, elegant API. It is designed for **personal projects and production use**, with strong typing, extensibility, and zero dependencies.

---

## ✨ Features

- ✅ Type-safe (TypeScript first)
- 🚀 Zero dependencies
- 🧩 Simple API: `success()` and `error()`
- 🔒 Production-friendly error handling (optional error exposure)
- 🛠 Easy to extend (pagination, HTTP helpers, trace IDs, etc.)

---

## 📦 Install

```bash
npm install @yw_zjqa/response
```

or

```bash
yarn add @yw_zjqa/response
```

---

## 🚀 Quick Start

```ts
import { success, error } from "@ywzjqa/response";

// Success responses
success();
success({ id: 1, name: "Alice" });
success({ id: 1 }, { code: 201, message: "Created" });

// Error responses
error("User not found", { code: 404 });
error(new Error("Database connection failed"));
error("Permission denied", { code: 403, expose: false });
```

---

## 📘 API Reference

### `success()`

Creates a successful response object.

#### Signatures

```ts
success(): BaseResult<undefined>
success<T>(data: T): BaseResult<T>
success<T>(data: T, options: ResultOptions): BaseResult<T>
```

#### Options

```ts
interface ResultOptions {
  code?: number; // Default: 200
  message?: string; // Default: "操作成功"
}
```

#### Example

```ts
success({ userId: 123 }, { code: 201, message: "User created" });
```

---

### `error()`

Creates a standardized error response. Supports strings, `Error` objects, or any unknown value.

#### Signatures

```ts
error(): BaseResult<null>
error(message: string): BaseResult<null>
error(err: unknown): BaseResult<null>
error(err: unknown, options: ErrorOptions): BaseResult<null>
```

#### Options

```ts
interface ErrorOptions {
  code?: number; // Default: 500
  message?: string; // Override final message

  // Whether to expose the real error message to the client
  // Default: true
  expose?: boolean;

  // Original error for logging or debugging
  cause?: unknown;
}
```

#### Example

```ts
try {
  throw new Error("DB connection failed");
} catch (e) {
  return error(e, { code: 503, expose: false });
}
```

---

## 📄 Response Format

All responses follow the same structure:

```ts
interface BaseResult<T> {
  code: number;
  message: string;
  timestamp: number;
  data: T;
  cause?: unknown;
}
```

Example output:

```json
{
  "code": 200,
  "message": "操作成功",
  "timestamp": 1700000000000,
  "data": {
    "id": 1
  }
}
```

---

## 🧩 Framework Integration

### Express / Fastify / Koa

```ts
app.get("/user", async (req, res) => {
  try {
    const user = await getUser();
    res.json(success(user));
  } catch (e) {
    res.status(500).json(error(e, { expose: false }));
  }
});
```

### NestJS

```ts
@Get(":id")
async findOne(@Param("id") id: string) {
  try {
    return success(await this.userService.find(id));
  } catch (e) {
    return error(e, { code: 404 });
  }
}
```

---

## 🛠 Roadmap (Optional Ideas)

- [ ] `page()` - Paginated responses
- [ ] `list()` - Standard list format
- [ ] HTTP helpers (`error.notFound()`, `error.unauthorized()`)
- [ ] Trace ID / Request ID support

---

## 🧪 Development

```bash
npm run build
```

---

## 📜 License

MIT

---

## 👤 Author

**yw_zjqa**

Built for personal projects and long-term maintainability.
