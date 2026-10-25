"use client";

import { useState } from "react";
import { PACKAGES, PackageId } from "@/lib/packages";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleBuy(packageId: PackageId) {
    setError("");

    if (!username.trim()) {
      setError("Please enter your in-game username first.");
      return;
    }

    setLoading(packageId);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          username: username.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Failed to start checkout");
      setLoading(null);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Game Cosmetics Store</h1>
          <p style={styles.subtitle}>
            Get exclusive donator sticks & cosmetics
          </p>
        </header>

        {/* Username input */}
        <div style={styles.usernameBox}>
          <label style={styles.label}>Your In-Game Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            style={styles.input}
            maxLength={50}
          />
          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* Packages */}
        <div style={styles.grid}>
          {/* Basic - $5 */}
          <div style={{ ...styles.card, borderColor: "#00d4aa" }}>
            <div style={styles.badge}>Basic</div>
            <h2 style={styles.packageName}>{PACKAGES.basic.name}</h2>
            <div style={styles.price}>
              <span style={styles.dollar}>$</span>5
            </div>
            <ul style={styles.features}>
              {PACKAGES.basic.features.map((f) => (
                <li key={f} style={styles.feature}>
                  ✓ {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuy("basic")}
              disabled={!!loading}
              style={{
                ...styles.button,
                background: loading === "basic" ? "#555" : "var(--accent)",
              }}
            >
              {loading === "basic" ? "Loading..." : "Buy Now"}
            </button>
          </div>

          {/* Plus - $10 */}
          <div
            style={{
              ...styles.card,
              borderColor: "var(--purple)",
              transform: "scale(1.03)",
            }}
          >
            <div
              style={{
                ...styles.badge,
                background: "var(--purple)",
              }}
            >
              Most Popular
            </div>
            <h2 style={styles.packageName}>{PACKAGES.plus.name}</h2>
            <div style={styles.price}>
              <span style={styles.dollar}>$</span>10
            </div>
            <ul style={styles.features}>
              {PACKAGES.plus.features.map((f) => (
                <li key={f} style={styles.feature}>
                  ✓ {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuy("plus")}
              disabled={!!loading}
              style={{
                ...styles.button,
                background: loading === "plus" ? "#555" : "var(--purple)",
              }}
            >
              {loading === "plus" ? "Loading..." : "Buy Now"}
            </button>
          </div>

          {/* Full - $20 */}
          <div style={{ ...styles.card, borderColor: "var(--pink)" }}>
            <div
              style={{
                ...styles.badge,
                background: "var(--pink)",
              }}
            >
              Best Value
            </div>
            <h2 style={styles.packageName}>{PACKAGES.full.name}</h2>
            <div style={styles.price}>
              <span style={styles.dollar}>$</span>20
            </div>
            <ul style={styles.features}>
              {PACKAGES.full.features.map((f) => (
                <li key={f} style={styles.feature}>
                  ✓ {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuy("full")}
              disabled={!!loading}
              style={{
                ...styles.button,
                background: loading === "full" ? "#555" : "var(--pink)",
              }}
            >
              {loading === "full" ? "Loading..." : "Buy Now"}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p style={styles.note}>
          After payment you will receive a confirmation. Message me with your
          username so I can deliver your items.
        </p>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 60%)",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 800,
    background: "linear-gradient(135deg, #00d4aa, #7c5cfc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 8,
  },
  subtitle: {
    color: "var(--muted)",
    fontSize: "1.1rem",
  },
  usernameBox: {
    maxWidth: 400,
    margin: "0 auto 48px",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: 600,
    color: "var(--text)",
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    fontSize: "1rem",
    borderRadius: 12,
    border: "2px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#ff6b6b",
    marginTop: 10,
    fontSize: "0.9rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    marginBottom: 40,
  },
  card: {
    background: "var(--card)",
    borderRadius: 20,
    padding: "32px 28px",
    border: "2px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  badge: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: "translateX(-50%)",
    background: "var(--accent)",
    color: "#000",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "4px 14px",
    borderRadius: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  packageName: {
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
  },
  price: {
    fontSize: "3rem",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 24,
  },
  dollar: {
    fontSize: "1.5rem",
    verticalAlign: "super",
  },
  features: {
    listStyle: "none",
    marginBottom: 28,
    flex: 1,
  },
  feature: {
    padding: "8px 0",
    color: "var(--muted)",
    fontSize: "0.95rem",
    borderBottom: "1px solid var(--border)",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: 700,
    border: "none",
    borderRadius: 12,
    color: "#fff",
    transition: "opacity 0.2s, transform 0.1s",
  },
  note: {
    textAlign: "center",
    color: "var(--muted)",
    fontSize: "0.9rem",
    maxWidth: 500,
    margin: "0 auto",
  },
};
