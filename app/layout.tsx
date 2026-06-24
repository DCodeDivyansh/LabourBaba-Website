import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LabourBaba",
  description: "Find • Book • Build",
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