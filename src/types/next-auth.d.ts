import { DefaultSession, DefaultUser } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    accessToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    iat: string;
    exp: string;
    jti: string;
    id: string;
    accessToken: string;
  }
}
