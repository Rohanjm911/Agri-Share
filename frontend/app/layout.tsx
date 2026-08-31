import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AgriShare | Agricultural Equipment & Machinery Rental Marketplace",
  description:
    "Rent tractors, harvesters, planters, and agricultural machinery directly from local equipment owners. High quality, verified, and cost-effective equipment sharing.",
  keywords: [
    "agricultural equipment rental",
    "tractor rental",
    "farm machinery sharing",
    "harvester rental",
    "farm equipment marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
