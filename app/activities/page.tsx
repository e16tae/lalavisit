import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivitiesClient } from "./activities-client";
import { ActivitiesSkeleton } from "./activities-skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "활동 갤러리 - 라라재가방문요양센터",
  description:
    "요양기관찾기 등록 라라재가방문요양센터의 현장 활동과 요양보호사 교육 사진. 방문요양 현장, 전문 교육 과정, 지역사회 프로그램을 소개합니다.",
  keywords: "요양기관찾기, 요양활동, 요양교육, 요양보호사교육, 현장사진, 교육사진, 방문요양현장",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/activities",
    title: "활동 갤러리 - 라라재가방문요양센터",
    description: "요양기관찾기 등록 라라재가방문요양센터의 요양 서비스 현장 활동과 전문 교육 활동을 사진으로 만나보세요",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/activities",
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "홈", url: "https://www.lalavisit.com" },
          { name: "활동 갤러리", url: "https://www.lalavisit.com/activities" },
        ]}
      />
      <Suspense fallback={<ActivitiesSkeleton />}>
        <ActivitiesClient />
      </Suspense>
    </>
  );
}
