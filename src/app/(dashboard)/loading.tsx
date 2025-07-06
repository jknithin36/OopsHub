"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white text-gray-700">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-sm font-medium animate-pulse">
        OopsHub is warming up...
      </p>
    </div>
  );
};

export default Loading;
