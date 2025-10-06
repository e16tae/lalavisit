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

import { Navigation } from "@/components/navigation";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "라라방문 - 라라재가방문요양센터",
  description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 라라재가방문요양센터입니다.",
  keywords: "방문요양, 가족요양, 입주간병, 요양보호사, 재가요양",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
