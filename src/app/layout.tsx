import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrokerCRM — Real Estate Admin",
  description: "Professional CRM for real estate broker firms",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
