"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const MemberListHeader = () => {
  const router = useRouter();

  return (
    <div className="mb-4">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Go Back
      </button>
    </div>
  );
};
