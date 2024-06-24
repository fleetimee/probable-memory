/* eslint-disable import/no-anonymous-default-export */
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from "@/config/env-mapper";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/models",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: DB_HOST as string,
    port: DB_PORT as number,
    user: DB_USER as string,
    password: DB_PASS as string,
    database: DB_NAME as string,
  },
});
