import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "../../assets/logo.png";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MANJU ABROAD CONSULTANCY | Premium US Visa & Overseas Consultancy",
  description:
    "Expert guidance for USA Student (F1), H1B, H4, and B1/B2 Visa applications. Professional visa slot booking assistance and consultation by A. Suresh Kumar.",
  keywords: [
    "Manju Abroad Consultancy",
    "US Student Visa F1",
    "H1B Visa Guidance",
    "H4 Dependent Visa",
    "B1 B2 Tourist Visa",
    "Visa Slot Booking Vijayawada",
    "US Visa Consultancy Andhra Pradesh",
    "Suresh Kumar Visa Consultancy",
  ],
  authors: [{ name: "A. Suresh Kumar" }],
  icons: {
    icon: logo.src,
    apple: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-bgLight text-textDark antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
