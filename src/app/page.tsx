"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();

  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Only Visible to Authorized users</h1>
      <Button onClick={() => mutate()}>LOGOUT</Button>
    </div>
  );
}
