import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoginNotificationPopup } from "@/components/notifications/LoginNotificationPopup";
import { HowItWorksModal } from "@/components/home/HowItWorksModal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060b08" },
  ],
};

export const metadata: Metadata = {
  title: "AgriShare | Modern Agricultural Machinery Rental Marketplace",
  description:
    "Rent high-performance tractors, harvesters, planters, sprayers, and implements directly from trusted local equipment owners across India.",
  keywords: [
    "agricultural equipment rental",
    "tractor rental India",
    "farm machinery sharing",
    "harvester rental",
    "custom hiring farm equipment",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`dark ${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <LoginNotificationPopup />
            <HowItWorksModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
