import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let username = "Unknown";
  let packageName = "Package";
  let amount = "";

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      username = session.metadata?.username || "Unknown";
      packageName = session.metadata?.packageName || "Package";
      if (session.amount_total) {
        amount = `$${(session.amount_total / 100).toFixed(2)}`;
      }
    } catch (e) {
      // ignore
    }
  }

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
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          border: "2px solid #2a2a3e",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00d4aa, #7c5cfc)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 40,
          }}
        >
          ✓
        </div>

        <h1 style={{ fontSize: "1.8rem", marginBottom: 12 }}>
          Payment Successful!
        </h1>

        <p style={{ color: "#8888a0", marginBottom: 28 }}>
          Thank you for your purchase.
        </p>

        <div
          style={{
            background: "#0a0a0f",
            borderRadius: 12,
            padding: 20,
            marginBottom: 28,
            textAlign: "left",
          }}
        >
          <p style={{ marginBottom: 8 }}>
            <strong>Username:</strong> {username}
          </p>
          <p style={{ marginBottom: 8 }}>
            <strong>Package:</strong> {packageName}
          </p>
          {amount && (
            <p>
              <strong>Amount:</strong> {amount}
            </p>
          )}
        </div>

        <p style={{ color: "#8888a0", fontSize: "0.95rem", marginBottom: 28 }}>
          Please message me with your username so I can deliver your items as
          soon as possible.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#00d4aa",
            color: "#000",
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
