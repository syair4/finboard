export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: "#888" }}>Welcome back! Here&apos;s your overview.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 24 }}>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>Projects</h2>
          <p style={{ fontSize: 32, margin: 0 }}>3</p>
        </div>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>Tests Run</h2>
          <p style={{ fontSize: 32, margin: 0 }}>127</p>
        </div>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>Bugs Found</h2>
          <p style={{ fontSize: 32, margin: 0 }}>12</p>
        </div>
      </div>
    </div>
  );
}