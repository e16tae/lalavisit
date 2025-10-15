import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "활동 갤러리 - 라라재가방문요양센터",
  description:
    "요양기관찾기 등록 라라재가방문요양센터의 현장 활동과 교육 활동 사진. 어르신 돌봄 현장과 요양보호사 교육 프로그램을 소개합니다.",
  keywords: "요양기관찾기, 요양센터활동, 방문요양현장, 요양보호사교육, 어르신돌봄, 재가요양활동",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/activities",
    title: "활동 갤러리 - 라라재가방문요양센터",
    description: "요양기관찾기 등록 라라재가방문요양센터는 현장 활동과 교육 활동을 통해 전문성을 높이고 있습니다",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/activities",
  },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
