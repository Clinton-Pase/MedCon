"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";


export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-h-screen md:ml-20">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 bg-gray-50 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}