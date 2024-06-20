export const NODE_ENV = process.env.NODE_ENV;

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const DB_MAX_CONNECTIONS = Number(process.env.DB_MAX_CONNECTIONS);
export const DB_SSL =
  NODE_ENV === "development"
    ? {
        rejectUnauthorized: false,
        sslMode: "require",
      }
    : { rejectUnauthorized: false };
