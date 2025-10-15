import Link from "next/link";
import { Heart, Users, Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "라라재가방문요양센터 | 요양기관찾기 공식 홈페이지",
  description:
    "요양기관찾기 등록 라라재가방문요양센터. 서울 송파구 가락동 방문요양·가족요양·입주간병 전문 서비스, 장기요양등급 1~5등급 맞춤 케어. 02-430-2351",
  keywords: "요양기관찾기, 방문요양, 가족요양, 입주간병, 요양보호사, 재가요양, 송파구요양, 가락동요양, 장기요양보험, 노인요양, 요양서비스",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com",
    title: "라라재가방문요양센터 | 요양기관찾기 공식 홈페이지",
    description: "요양기관찾기 등록 라라재가방문요양센터. 사랑과 정성으로 어르신들의 건강한 일상을 함께합니다.",
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
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 md:py-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">
                  라라재가방문요양센터
                </span>
              </h1>
            </div>
            <div className="animate-slide-up space-y-4">
              <p className="text-xl md:text-2xl text-gray-700 font-semibold">
                믿을 수 있는 전문 요양 서비스
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                사랑과 정성으로 어르신들의 건강한 일상을 함께합니다
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center animate-scale-in">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  서비스 문의하기
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                <Link href="/services" className="inline-flex items-center gap-2">
                  서비스 알아보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              우리의 서비스
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              전문적이고 체계적인 요양 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/services#home-care"
              className="group relative flex flex-col p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  방문요양
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  어르신의 가정을 방문하여 신체활동 및 일상생활을 지원합니다.
                </p>
                <div className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  자세히 보기 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/services#family-care"
              className="group relative flex flex-col p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Users className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">
                  가족요양
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  가족이 직접 요양보호사가 되어 어르신을 돌볼 수 있도록 지원합니다.
                </p>
                <div className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  자세히 보기 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/services#live-in-care"
              className="group relative flex flex-col p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Home className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  입주간병
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  24시간 전문 간병 서비스로 안심하고 생활할 수 있도록 돕습니다.
                </p>
                <div className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  자세히 보기 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            전문적인 요양 서비스가 필요하신가요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            지금 바로 상담을 신청하세요. 친절하게 안내해드리겠습니다.
          </p>
          <Button asChild size="lg" className="bg-white text-primary rounded-full hover:bg-gradient-to-r hover:from-secondary hover:to-primary hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <Link href="/contact" className="inline-flex items-center gap-2">
              상담 신청
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
