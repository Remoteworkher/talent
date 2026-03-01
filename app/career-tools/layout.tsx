"use client";
import React from "react";
import { useAllTools } from "@/hooks/useCareerTools";

export default function CareerToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Prefetch all tools to heat the cache for subpages
  useAllTools();

  return (
    <div>
      <div className=" max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
}
