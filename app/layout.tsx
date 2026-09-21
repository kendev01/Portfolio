import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kenneth-bolilan-portfolio.vercel.app"),
  title: `${personalInfo.name} — ${personalInfo.title}`,
  description:
    "Portfolio of Kenneth John B. Bolilan, a Full-Stack Web Developer specializing in Node.js, Vue.js, and scalable MySQL/MSSQL database systems.",
  openGraph: {
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description:
      "Portfolio of Kenneth John B. Bolilan, a Full-Stack Web Developer specializing in Node.js, Vue.js, and scalable MySQL/MSSQL database systems.",
    type: "website",
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: "Portfolio of Kenneth John B. Bolilan, Full-Stack Web Developer.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeProvider>
          <SmoothScroll />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
