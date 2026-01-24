"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";

export default function StartPage() {
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { user: clerkUser } = useUser();
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn === true) {
      push("/");
    }
  }, [isLoaded, isSignedIn, push]);

  return (
    <div>
      <Button onClick={() => push("/signUp")}>SIGN UP</Button>
      <SignInButton />
    </div>
  );
}
