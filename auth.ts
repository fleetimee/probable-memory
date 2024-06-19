import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

async function authFromApi(credentials: Partial<Record<string, unknown>>) {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    return response.json();
  }

  const error = await response.json();
  throw new Error(error.message);
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Credentials({
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);
    //     if (!parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data;
    //     }
    //   },
    // }),
  ],
});
