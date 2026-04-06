import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test App",
  description: "A simple test application for ClawQA automated testing. Features login, dashboard, and about pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", gap: 16, padding: "16px 24px", borderBottom: "1px solid #222", background: "#0a0a0a" }}>
          <a href="/" style={{ color: "#eee", textDecoration: "none" }}>Home</a>
          <a href="/about" style={{ color: "#eee", textDecoration: "none" }}>About</a>
          <a href="/dashboard" style={{ color: "#eee", textDecoration: "none" }}>Dashboard</a>
          <a href="/login" style={{ color: "#eee", textDecoration: "none" }}>Login</a>
        </nav>
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}