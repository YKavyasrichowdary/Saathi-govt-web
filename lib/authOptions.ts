import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import loginService from "@/services/auth/login.service";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await loginService.login(
            credentials.email,
            credentials.password
          );

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("Invalid email or password.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      const userId = (token?.id || token?.sub) as string;

      if (session && userId) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, role: true },
          });

          if (dbUser) {
            session.user = {
              ...session.user,
              id: dbUser.id,
              name: dbUser.name ?? session.user?.name ?? "",
              email: dbUser.email ?? session.user?.email ?? "",
              image: dbUser.image ?? session.user?.image ?? null,
              role: dbUser.role ?? "STUDENT",
            };
          } else {
            session.user = {
              ...session.user,
              id: userId,
              role: (token.role as string) || "STUDENT",
            };
          }
        } catch (error) {
          console.error("Error fetching user in session callback:", error);
          session.user = {
            ...session.user,
            id: userId,
            role: (token.role as string) || "STUDENT",
          };
        }
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET || "kavya_secret",
};
