import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "../components/FAQ Home/Navbar/ResponsiveNav";

const font=Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Employee Attendance FAQ Page",
  description: "Generated using Next.js 15, Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ResponsiveNav />
        {children}
      </body>
    </html>
  );
}
