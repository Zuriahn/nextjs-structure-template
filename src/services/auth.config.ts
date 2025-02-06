import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Email: { label: "Email", type: "email" },
        Password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.get<{
            id: string;
            name: string;
            lastName: string;
            email: string;
            accessToken: string;
          }>(
            `${process.env.NEXT_PUBLIC_URL_BASE}/Users?email=${credentials?.Email}&password=${credentials?.Password}`
          );
          var user = {
            id: res.data.id,
            name: res.data.name,
            lastName: res.data.lastName,
            email: res.data.email,
            accessToken: res.data.accessToken,
          };
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id!;
        token.name = `${user.name} ${user.lastName}`;
        token.email = user.email!;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
