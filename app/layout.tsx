"use client";

import "./globals.css";
import MenuSidebar from "@/components/Sidebar/MenuSidebar";
import TalentTopBar from "@/components/TopBar/TalentTopBar";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useTokens } from "@/hooks/useTokens";
import { PaymentVerifier } from "@/components/reusables/PaymentVerifier";
import React, { useState, useEffect, Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/subscribe");

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  const sidebarWidth = isCollapsed ? 80 : 275;
  const isDesktop = mounted && typeof window !== "undefined" ? window.innerWidth >= 768 : false;

  return (
    <html lang="en">
      <body className="flex bg-white">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Suspense fallback={null}>
               <PaymentVerifier />
            </Suspense>
            {!hideLayout && (
              <>
                {/* Sidebar */}
                <div
                  className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 bg-white
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                  `}
                  style={{ width: `${sidebarWidth}px` }}
                >
                  <MenuSidebar onCollapseChange={setIsCollapsed} />
                </div>
                {/* Overlay for mobile */}
                {sidebarOpen && (
                  <div
                    className="fixed inset-0 z-20 bg-black/30 md:hidden"
                    onClick={handleToggleSidebar}
                  />
                )}
                {/* Main content */}
                <div
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300 ml-0"
                  style={{
                    marginLeft:
                      mounted && window.innerWidth >= 768 ? `${sidebarWidth}px` : "0",
                  }}
                >
                  <div
                    className="fixed top-0 right-0 z-20 w-full transition-all duration-300 md:left-auto"
                    style={{
                      left:
                        mounted && window.innerWidth >= 768 ? `${sidebarWidth}px` : "0",
                    }}
                  >
                    <TalentTopBar onToggleSidebar={handleToggleSidebar} isCollapsed={isCollapsed} />
                  </div>
                  <main className="flex-1 pt-[80px] p-4">{children}</main>
                </div>
              </>
            )}
            {hideLayout && (
              <main className="flex-1 min-h-screen">{children}</main>
            )}
          </AuthProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
