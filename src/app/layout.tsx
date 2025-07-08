import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OopsHub – Organize. Collaborate. Succeed.",
  // ...your metadata
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
        <QueryProvider>
          <Toaster />
          <ModalProvider>{children}</ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
