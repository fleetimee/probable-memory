import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnRoot = nextUrl.pathname === "/";
      const isOnLogin = nextUrl.pathname === "/login";

      if (isLoggedIn && (isOnRoot || isOnLogin)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isLoggedIn && (isOnRoot || isOnDashboard)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
