"use client";

import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#0e0e0e] overflow-hidden">
      {/* Left Panel with background and branding */}
      <div className="relative hidden md:flex flex-col justify-between px-10 py-8 bg-gradient-to-br from-blue-50 via-white to-white dark:from-[#101010] dark:to-[#1a1a1a]">
        {/* Decorative Blurred Circles */}
        <div className="absolute w-[300px] h-[300px] bg-blue-200 dark:bg-blue-900 opacity-30 rounded-full top-10 left-10 blur-3xl pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-purple-200 dark:bg-purple-800 opacity-20 rounded-full bottom-20 right-20 blur-2xl pointer-events-none" />
        <div className="absolute w-[180px] h-[180px] bg-pink-300 dark:bg-pink-900 opacity-20 rounded-full top-1/3 right-5 blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div>
          <Image src="/logo.png" alt="OopsHub" width={100} height={40} />
        </div>

        {/* Tagline */}
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Organize. Collaborate. Succeed.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold italic text-primary">OopsHub</span>{" "}
              – your productivity workspace.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-sm text-gray-500 dark:text-gray-400 z-10">
          &copy; {new Date().getFullYear()} OopsHub. All rights reserved. –
          designed by{" "}
          <a
            href="https://www.linkedin.com/in/jknithin/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Nithin Kumar
          </a>
        </footer>
      </div>

      {/* Right Panel (Auth Form) */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">{children}</div>
      </div>
    </main>
  );
}
