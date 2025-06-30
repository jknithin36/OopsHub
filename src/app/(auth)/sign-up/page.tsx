import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";
import React from "react";

const SignUPPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUPPage;

// page.tsx should be default export

// () --> ROute Groups

//
