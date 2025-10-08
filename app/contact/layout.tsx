import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 신청 - 라라재가방문요양센터",
  description: "무료 상담 신청. 전화 02-430-2351, 010-9573-2351. 이메일 lalavisit@naver.com. 방문요양, 가족요양, 입주간병 서비스 문의 환영합니다.",
  keywords: "요양상담, 방문요양신청, 무료상담, 요양서비스문의, 장기요양신청",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/contact",
    title: "상담 신청 - 라라재가방문요양센터",
    description: "친절하게 상담해 드립니다. 지금 바로 무료 상담을 신청하세요.",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
