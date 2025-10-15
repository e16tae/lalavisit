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
import { WebSiteSchema, LocalBusinessSchema, ServiceSchema, OrganizationSchema } from "@/components/schema-org";
import { SkipToContent } from "@/components/skip-to-content";
import { Toaster } from "@/components/ui/sonner";
import { WebVitals } from "@/components/web-vitals";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

const verification: Metadata["verification"] = {};

if (googleVerification) {
  verification.google = googleVerification;
}

if (naverVerification) {
  verification.other = { "naver-site-verification": naverVerification };
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lalavisit.com"),
  title: {
    default: "라라재가방문요양센터 | 요양기관찾기 공식 홈페이지",
    template: "%s | 라라재가방문요양센터",
  },
  description: "요양기관찾기 등록 라라재가방문요양센터. 서울 송파구 가락동 주소, 방문요양·가족요양·입주간병 전문 서비스, 02-430-2351",
  keywords: ["요양기관찾기", "방문요양", "가족요양", "입주간병", "요양보호사", "재가요양", "송파구요양", "가락동요양", "장기요양보험", "노인요양", "요양서비스"],
  authors: [{ name: "라라재가방문요양센터" }],
  creator: "라라재가방문요양센터",
  publisher: "라라재가방문요양센터",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com",
    title: "라라재가방문요양센터 | 요양기관찾기 공식 홈페이지",
    description: "요양기관찾기 등록 라라재가방문요양센터. 사랑과 정성으로 어르신들의 건강한 일상을 함께합니다.",
    siteName: "라라재가방문요양센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "라라재가방문요양센터 | 요양기관찾기 공식 홈페이지",
    description: "요양기관찾기 등록 라라재가방문요양센터. 사랑과 정성으로 어르신들의 건강한 일상을 함께합니다.",
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
  ...(verification.google || verification.other ? { verification } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="subject" content="요양기관찾기 라라재가방문요양센터" />
        <meta name="classification" content="국민건강보험공단 요양기관찾기 등록 재가방문요양센터" />
        <meta name="url" content="https://www.lalavisit.com" />
        <meta name="identifier-URL" content="https://www.lalavisit.com" />
        <meta name="geo.position" content="37.4925;127.1202" />
        <meta name="geo.placename" content="서울특별시 송파구 가락동 303호" />
        <meta name="geo.region" content="KR-11" />
        <WebSiteSchema />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
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
