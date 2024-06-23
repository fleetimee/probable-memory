/* eslint-disable import/no-anonymous-default-export */
import {
  DB_HOST,
  DB_MAX_CONNECTIONS,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_SSL,
  DB_USER,
} from "@/config/env-mapper";

import { defineConfig } from "drizzle-kit";

// @ts-ignore
export default defineConfig({
  schema: "./src/models",
  out: "./drizzle",
  dialect: "postgresql",
  // dbCredentials: {
  //   host: "elearning.fleetime.my.id",
  //   port: 5432,
  //   user: "postgres",
  //   password: "admin*tik",
  //   database: "neondb",
  // },
  dbCredentials: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    ssl: DB_SSL,
  },
});
