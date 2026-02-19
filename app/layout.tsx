import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post-Party Pulse | Partiful",
  description: "Lightweight positive feedback after your event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <main className="min-h-screen max-w-mobile mx-auto shadow-lg">
          {children}
        </main>
      </body>
    </html>
  );
}
