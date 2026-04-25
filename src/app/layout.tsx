import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "apa role kamu di facebook",
  description: "Cari tahu role kamu di facebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
