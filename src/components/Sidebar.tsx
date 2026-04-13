"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout, type User } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/portfolio", label: "Portfolio", icon: "💼" },
  { href: "/calculator", label: "Calculator", icon: "🧮" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
    const handler = () => setUser(getUser());
    window.addEventListener("auth-change", handler);
    return () => window.removeEventListener("auth-change", handler);
  }, []);

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-16 lg:w-56 bg-[#111827] border-r border-gray-800 flex flex-col z-30">
      <div className="p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <span className="hidden lg:block text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            FinBoard
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-2 flex flex-col gap-1 mt-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="hidden lg:flex items-center gap-2 px-2">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-gray-400 truncate">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <span className="text-lg">🚪</span>
              <span className="hidden lg:block">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <span className="text-lg">🔑</span>
            <span className="hidden lg:block">Sign In</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
