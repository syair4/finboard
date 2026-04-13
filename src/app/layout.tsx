import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "FinBoard — Stocks & Crypto Dashboard",
  description: "Real-time stock and cryptocurrency dashboard with portfolio tracking and investment calculator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#0b0f1a] text-gray-100">
        <Sidebar />
        <main id="main-content" className="flex-1 ml-16 lg:ml-56 relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
