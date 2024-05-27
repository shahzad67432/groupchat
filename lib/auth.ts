import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
      };
    }
  }

interface Credentials {
    name: string;
}

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Unique name", type: "text", placeholder: "Write your name", required: true },
          },
          async authorize(credentials: Credentials | undefined) {
            if (!credentials) {
              return null;
            }
            const existingUser = await prisma.user.findFirst({
                where: {
                    name: credentials.name
                }
            });

            if (existingUser) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                    }
            }

            try {
                const user = await prisma.user.create({
                    data: {
                        name: credentials.name,
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user) {
                session.user.id = token.sub ?? "";
              }
            return session;
          },
    }
  }
  