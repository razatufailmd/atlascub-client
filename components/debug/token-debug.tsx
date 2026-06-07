"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TokenDebug() {
  const { getToken, userId, isSignedIn } = useAuth();
  const [token, setToken] = useState<string>("");

  const copyToken = async () => {
    const t = await getToken();
    setToken(t || "");
    await navigator.clipboard.writeText(t || "");
    alert("Token copied to clipboard!");
  };

  if (process.env.NODE_ENV !== "development") return null;
  if (!isSignedIn) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/80 p-3 text-xs text-white">
      <div>User ID: {userId?.slice(0, 20)}...</div>
      <Button
        size="sm"
        variant="secondary"
        className="mt-2 h-7 text-xs"
        onClick={copyToken}
      >
        Copy Token
      </Button>
      {token && (
        <div className="mt-2 max-w-[300px] break-all text-[10px] text-gray-300">
          Token: {token.slice(0, 50)}...
        </div>
      )}
    </div>
  );
}