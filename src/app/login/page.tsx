export default function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Sign In</h1>
      <form method="POST" onSubmit={(e) => { e.preventDefault(); /* TODO: Add auth logic */ }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" required
            style={{ display: "block", width: "100%", padding: 10, marginTop: 4, borderRadius: 6, border: "1px solid #333", background: "#1a1a1a", color: "#eee" }} />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="••••••••" required
            style={{ display: "block", width: "100%", padding: 10, marginTop: 4, borderRadius: 6, border: "1px solid #333", background: "#1a1a1a", color: "#eee" }} />
        </label>
        <button type="submit"
          style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: 8, cursor: "pointer", marginTop: 8 }}>
          Sign In
        </button>
      </form>
      <p style={{ marginTop: 16, color: "#888" }}>Don&apos;t have an account? <a href="/about" style={{ color: "#60a5fa" }}>Learn more</a></p>
    </div>
  );
}