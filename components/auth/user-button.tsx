"use client";

import { useUser, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function UserButton() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!isSignedIn) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  return (
    <ClerkUserButton
      appearance={{
        elements: {
          userButtonAvatarBox: "h-9 w-9",
        },
      }}
    />
  );
}