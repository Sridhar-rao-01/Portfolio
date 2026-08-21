import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S Sridhar Rao | HACKBITS — Full Stack Developer & DevOps Engineer",
  description:
    "Portfolio of S Sridhar Rao — creative full stack developer transitioning into DevOps engineering. Building at the intersection of code and infrastructure.",
  keywords: [
    "full stack developer",
    "devops engineer",
    "Next.js",
    "React",
    "Python",
    "portfolio",
    "HACKBITS",
  ],
  openGraph: {
    title: "S Sridhar Rao | HACKBITS",
    description:
      "Creative Full Stack Developer & DevOps Engineer — Building the future, one commit at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
