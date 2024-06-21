import {
  DB_HOST,
  DB_MAX_CONNECTIONS,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_SSL,
  DB_USER,
} from "@/config/env-mapper";
import { users } from "@/models/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const pg = postgres({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  ssl: DB_SSL,
  max: DB_MAX_CONNECTIONS,
});

const db = drizzle(pg);

migrate(db, { migrationsFolder: "drizzle" });

export default db;

export async function getUser(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}
