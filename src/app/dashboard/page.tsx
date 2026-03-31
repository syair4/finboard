export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: "#888" }}>Welcome back! Here&apos;s your overview.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 24 }}>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h3 style={{ margin: "0 0 8px" }}>Projects</h3>
          <p style={{ fontSize: 32, margin: 0 }}>3</p>
        </div>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h3 style={{ margin: "0 0 8px" }}>Tests Run</h3>
          <p style={{ fontSize: 32, margin: 0 }}>127</p>
        </div>
        <div style={{ padding: 20, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
          <h3 style={{ margin: "0 0 8px" }}>Bugs Found</h3>
          <p style={{ fontSize: 32, margin: 0 }}>-3</p>
        </div>
      </div>
    </div>
  );
}
