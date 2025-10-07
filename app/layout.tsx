import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

import { Navigation } from "@/components/navigation";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { LocalBusinessSchema, ServiceSchema } from "@/components/schema-org";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SkipToContent } from "@/components/skip-to-content";

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko">
      <head>
        <LocalBusinessSchema />
        <ServiceSchema />
      </head>
      <body
        className={`${pretendard.variable} antialiased`}
        style={{ fontFamily: 'var(--font-pretendard)' }}
      >
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <SkipToContent />
        <Navigation />
        <main id="main-content" className="pt-16 min-h-screen" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
