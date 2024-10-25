import { Hono, HonoRequest } from "hono";
import cors from "hono/cors";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.get("/", async (c) => {
  return c.json("Welcome to DateRequst");
});

export default app;
