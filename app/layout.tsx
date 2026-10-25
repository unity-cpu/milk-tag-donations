import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Cosmetics Store",
  description: "Buy donator sticks and cosmetics for the game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
