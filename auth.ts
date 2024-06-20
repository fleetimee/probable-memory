import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "@/database/connect";
import { compare } from "bcrypt-ts";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(credentials);

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log(parsedCredentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          console.log(user);
          if (!user) return null;

          let passwordMatch = await compare(password, user[0].password!);

          console.log(passwordMatch);

          if (passwordMatch) return user[0];
        }

        return parsedCredentials.success ? parsedCredentials.data : null;
      },
    }),
  ],
});
