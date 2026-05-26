"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 120, height = 40 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = !mounted 
    ? "/logo/logoblack.png" 
    : resolvedTheme === "dark" 
      ? "/logo/logoLight.png" 
      : "/logo/logoblack.png";

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Atlascub"
        width={width}
        height={height}
        className="object-contain min-w-[50px]"
        priority
      />
    </Link>
  );
}