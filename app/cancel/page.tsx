import Link from "next/link";

export default function CancelPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 60%)",
      }}
    >
      <div
        style={{
          background: "#14141f",
          borderRadius: 20,
          padding: "48px 40px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          border: "2px solid #2a2a3e",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", marginBottom: 12 }}>
          Payment Cancelled
        </h1>
        <p style={{ color: "#8888a0", marginBottom: 28 }}>
          No worries — nothing was charged. You can try again whenever you
          want.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#7c5cfc",
            color: "#fff",
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          Back to Store
        </Link>
      </div>
    </main>
  );
}
