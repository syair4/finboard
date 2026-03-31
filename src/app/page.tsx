export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Test App</h1>
      <p>This is a simple test application for ClawQA automated testing.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <a href="/abuot" style={{ padding: "10px 20px", background: "#2563eb", color: "white", borderRadius: 8, textDecoration: "none" }}>
          Learn More
        </a>
        <a href="/login" style={{ padding: "10px 20px", background: "#333", color: "white", borderRadius: 8, textDecoration: "none" }}>
          Sign In
        </a>
      </div>
    </div>
  );
}
