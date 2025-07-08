"use client";

import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

interface StandAloneLayoutProps {
  children: React.ReactNode;
}

const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
  return (
    <main className="min-h-screen bg-[#f4f5f7] text-neutral-900 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-300">
        <div className="mx-auto w-full max-w-7xl px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/navbar.png"
              alt="OopsHub logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-grow">{children}</section>
    </main>
  );
};

export default StandAloneLayout;
