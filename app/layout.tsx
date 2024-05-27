import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatHeader from "@/components/chat/ChatHeader";
import { SessionProvider } from "next-auth/react";
import Providers from "@/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ChatHeader/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
