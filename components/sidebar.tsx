"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  FileInput,
  CreditCard,
  Receipt,
  Building2,
  BarChart3,
  Settings,
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-5 font-bold text-lg text-blue-600">
        MedRecon
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}