"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, FileText, AlertTriangle, FileInput,
  CreditCard, Receipt, Building2, BarChart3, Settings,
  LogOut, Menu, X,
} from "lucide-react";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/claims", label: "Claims", icon: FileText },
  { href: "/exceptions", label: "Exceptions", icon: AlertTriangle },
  { href: "/remittances", label: "Remittances", icon: FileInput },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/tariffs", label: "Tariffs", icon: Receipt },
  { href: "/hmos", label: "HMOs", icon: Building2 },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  // delete this line, no longer needed here:
  // const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
    

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`group bg-white border-r h-screen flex flex-col fixed md:sticky top-0 z-50
          transition-all duration-300 overflow-x-hidden overflow-y-auto
          w-64 md:w-20 md:hover:w-64
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b shrink-0">
          <span className="font-bold text-lg text-blue-600 tracking-tight whitespace-nowrap">
            <span className="md:hidden">MedRecon</span>
            <span className="hidden md:inline md:group-hover:hidden">Med</span>
            <span className="hidden md:group-hover:inline">MedRecon</span>
          </span>
          <button onClick={() => setMobileOpen(false)} className="md:hidden p-1 text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* User block */}
        <div className="px-3 py-4 border-b shrink-0">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold shrink-0">
              C
            </div>
            <div className="min-w-0 whitespace-nowrap md:hidden md:group-hover:block">
              <p className="text-sm font-bold text-gray-900 truncate">Billing Officer</p>
              <p className="text-xs text-gray-900 truncate">MedRecon Demo</p>
            </div>
           
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-[0.3rem] text-sm font-medium whitespace-nowrap transition-colors ${
                  active ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-500 hover:text-gray-50"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span className="md:hidden">{label}</span>
                <span className="hidden md:group-hover:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t shrink-0">
  <button
    onClick={() => {
      // TODO: wire to real logout once auth is ready (Phase 9)
      alert("Logout coming soon");
    }}
    className="flex items-center gap-3 px-3 py-2 rounded-[0.3rem] text-sm font-medium whitespace-nowrap w-full text-red-600 hover:bg-red-50"
  >
    <LogOut size={20} className="shrink-0" />
    <span className="md:hidden">Log out</span>
    <span className="hidden md:group-hover:inline">Log out</span>
  </button>
</div>

      </aside>
    </>
  );
}