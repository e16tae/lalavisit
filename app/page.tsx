import Link from "next/link";
import { Heart, Users, Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "라라재가방문요양센터 - 믿을 수 있는 전문 요양 서비스",
  description: "서울 송파구 가락동 위치. 방문요양, 가족요양, 입주간병 서비스 제공. 장기요양등급 1~5등급, 인지지원등급 어르신을 위한 전문 케어. 02-430-2351",
  keywords: "방문요양, 가족요양, 입주간병, 요양보호사, 재가요양, 송파구요양, 가락동요양, 장기요양보험, 노인요양, 요양서비스",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com",
    title: "라라재가방문요양센터 - 믿을 수 있는 전문 요양 서비스",
    description: "사랑과 정성으로 어르신들의 건강한 일상을 함께합니다. 방문요양, 가족요양, 입주간병 전문 센터",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                라라재가방문요양센터
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              믿을 수 있는 전문 요양 서비스
            </p>
            <p className="text-lg text-gray-600">
              사랑과 정성으로 어르신들의 건강한 일상을 함께합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                서비스 문의하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                서비스 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">우리의 서비스</h2>
            <p className="text-lg text-gray-600">
              전문적이고 체계적인 요양 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">방문요양</h3>
              <p className="text-gray-600 mb-4">
                어르신의 가정을 방문하여 신체활동 및 일상생활을 지원합니다.
              </p>
              <Link href="/services#home-care" className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-secondary hover:shadow-xl transition-all cursor-pointer">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">가족요양</h3>
              <p className="text-gray-600 mb-4">
                가족이 직접 요양보호사가 되어 어르신을 돌볼 수 있도록 지원합니다.
              </p>
              <Link href="/services#family-care" className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">입주간병</h3>
              <p className="text-gray-600 mb-4">
                24시간 전문 간병 서비스로 안심하고 생활할 수 있도록 돕습니다.
              </p>
              <Link href="/services#live-in-care" className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            전문적인 요양 서비스가 필요하신가요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            지금 바로 상담을 신청하세요. 친절하게 안내해드리겠습니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105"
          >
            무료 상담 신청
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
