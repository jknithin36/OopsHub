"use client";

import { Loader2 } from "lucide-react";
import React from "react";

const GlobalLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-muted-foreground">
      <div className="animate-spin text-primary">
        <Loader2 className="w-8 h-8" />
      </div>
      <p className="text-sm font-medium tracking-wide">Loading OopsHub...</p>
    </div>
  );
};

export default GlobalLoader;
