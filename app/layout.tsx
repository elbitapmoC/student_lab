import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "Appointment lab" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7f8f5] font-sans text-[#183c36] antialiased">
        {children}
      </body>
    </html>
  );
}
