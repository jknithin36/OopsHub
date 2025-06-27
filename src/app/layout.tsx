import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OopsHub – Organize. Collaborate. Succeed.",
  description:
    "OopsHub is a modern workspace management tool for teams to plan, collaborate, and execute projects efficiently.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "OopsHub",
    "project management",
    "workspace",
    "team collaboration",
    "Jira clone",
  ],
  authors: [
    { name: "OopsHub Team", url: "https://www.linkedin.com/in/jknithin/" },
  ],
  openGraph: {
    title: "OopsHub – Your productivity workspace",
    description: "Plan, collaborate, and manage your work with OopsHub.",
    images: ["/logo.png"],
    url: "https://oopshub.app",
    siteName: "OopsHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OopsHub",
    description: "The smarter way to manage projects with your team.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
