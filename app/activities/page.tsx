import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivitiesClient } from "./activities-client";
import { ActivitiesSkeleton } from "./activities-skeleton";
import { BreadcrumbSchema } from "@/components/schema-org";

export const metadata: Metadata = {
  title: "활동 갤러리 - 라라재가방문요양센터",
  description: "현장 활동 사진과 교육 활동 사진을 확인하세요. 요양보호 현장과 전문 교육 과정을 소개합니다.",
  keywords: "요양활동, 요양교육, 요양보호사교육, 현장사진, 교육사진, 방문요양현장",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/activities",
    title: "활동 갤러리 - 라라재가방문요양센터",
    description: "요양 서비스 현장 활동과 전문 교육 활동을 사진으로 만나보세요",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/activities",
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <BreadcrumbSchema
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
