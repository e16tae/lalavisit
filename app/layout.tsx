import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: "Arial",
});

import { Navigation } from "@/components/navigation";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { WebSiteSchema, LocalBusinessSchema, ServiceSchema, OrganizationSchema, FAQPageSchema } from "@/components/schema-org";
import { SkipToContent } from "@/components/skip-to-content";
import { Toaster } from "@/components/ui/sonner";
import { WebVitals } from "@/components/web-vitals";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lalavisit.com"),
  title: {
    default: "라라재가방문요양센터 - 믿을 수 있는 전문 요양 서비스",
    template: "%s | 라라재가방문요양센터",
  },
  description: "서울 송파구 가락동 위치. 방문요양, 가족요양, 입주간병 서비스 제공. 장기요양등급 1~5등급, 인지지원등급 어르신을 위한 전문 케어. 02-430-2351",
  keywords: ["방문요양", "가족요양", "입주간병", "요양보호사", "재가요양", "송파구요양", "가락동요양", "장기요양보험", "노인요양", "요양서비스"],
  authors: [{ name: "라라재가방문요양센터" }],
  creator: "라라재가방문요양센터",
  publisher: "라라재가방문요양센터",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com",
    title: "라라재가방문요양센터 - 믿을 수 있는 전문 요양 서비스",
    description: "사랑과 정성으로 어르신들의 건강한 일상을 함께합니다. 방문요양, 가족요양, 입주간병 전문 센터",
    siteName: "라라재가방문요양센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "라라재가방문요양센터 - 믿을 수 있는 전문 요양 서비스",
    description: "사랑과 정성으로 어르신들의 건강한 일상을 함께합니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <WebSiteSchema />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <FAQPageSchema />
      </head>
      <body
        className={`${pretendard.variable} antialiased`}
        style={{ fontFamily: 'var(--font-pretendard)' }}
      >
        <WebVitals />
        <SkipToContent />
        <Navigation />
        <main id="main-content" className="pt-16 min-h-screen" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <Toaster />
      </body>
    </html>
  );
}
