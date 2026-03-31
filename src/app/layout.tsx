export const metadata = { title: "Test App", description: "ClawQA test application" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "#ededed" }}>
        <nav style={{ display: "flex", gap: 16, padding: "16px 24px", background: "#111", borderBottom: "1px solid #222" }}>
          <a href="/" style={{ color: "#60a5fa", textDecoration: "none" }}>Home</a>
          <a href="/about" style={{ color: "#60a5fa", textDecoration: "none" }}>About</a>
          <a href="/dashbord" style={{ color: "#60a5fa", textDecoration: "none" }}>Dashboard</a>
          <a href="/login" style={{ color: "#60a5fa", textDecoration: "none", marginLeft: "auto" }}>Login</a>
        </nav>
        <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>{children}</main>
      </body>
    </html>
  );
}
