"use client";

import { Menu } from "lucide-react";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="md:hidden flex items-center justify-between px-4 h-14 border-b bg-white sticky top-0 z-30">
      <span className="font-bold text-lg text-blue-600 tracking-tight">MedRecon</span>
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-900"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}