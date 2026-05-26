"use client";

import { useUser, SignInButton, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function UserButton() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </SignInButton>
    );
  }

  return <ClerkUserButton />;
}