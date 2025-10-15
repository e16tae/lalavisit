import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";

import { ContactPageClient } from "./contact-page-client";

export const metadata: Metadata = {
  title: "문의하기 - 라라재가방문요양센터",
  description:
    "요양기관찾기 라라재가방문요양센터 상담 신청. 전화 02-430-2351, 주소 서울 송파구 가락동 303호. 카카오톡·이메일 상담 안내.",
  keywords: "라라재가방문요양센터 상담, 요양기관찾기 문의, 방문요양 상담, 송파구 요양센터 연락처",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/contact",
    title: "문의하기 - 라라재가방문요양센터",
    description: "요양기관찾기 등록 라라재가방문요양센터 상담 신청 페이지",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "홈", url: "https://www.lalavisit.com" },
          { name: "문의하기", url: "https://www.lalavisit.com/contact" },
        ]}
      />
      <ContactPageClient />
    </>
  );
}
