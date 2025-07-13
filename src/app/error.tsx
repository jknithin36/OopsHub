"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("🚨 App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-destructive/10 text-destructive p-4 rounded-full">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-sm">
            We couldn’t load this page. Please try again or go back to the
            dashboard.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
