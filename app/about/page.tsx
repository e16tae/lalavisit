import { MapPin, Phone, Mail, User } from "lucide-react";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-org";

export const metadata: Metadata = {
  title: "센터 소개 - 라라재가방문요양센터",
  description: "서울 송파구 가락동 위치. 대표자 이경빈. 전화: 02-430-2351, 010-9573-2351. 가락시장역 6번 출구 도보 5분. 전문 요양보호사와 사회복지사가 함께합니다.",
  keywords: "송파구요양센터, 가락동요양센터, 요양센터위치, 요양센터전화번호, 가락시장역요양센터",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/about",
    title: "센터 소개 - 라라재가방문요양센터",
    description: "어르신들께 최상의 요양 서비스를 제공하는 라라재가방문요양센터를 소개합니다",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://www.lalavisit.com" },
          { name: "센터 소개", url: "https://www.lalavisit.com/about" },
        ]}
      />
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              센터 소개
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center">
            라라재가방문요양센터를 소개합니다
          </p>
        </div>
      </section>

      {/* Greeting Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">인사말</h2>
            <div className="prose prose-lg mx-auto text-gray-700 space-y-4">
              <p>
                안녕하세요, 라라재가방문요양센터를 방문해 주셔서 감사합니다.
              </p>
              <p>
                저희 센터는 어르신들께 최상의 요양 서비스를 제공하기 위해 설립되었습니다.
                전문적인 요양보호사들이 사랑과 정성으로 어르신들의 건강한 일상을 함께하고 있습니다.
              </p>
              <p>
                가족 같은 마음으로 어르신 한 분 한 분을 소중히 모시며,
                편안하고 안전한 요양 서비스를 제공하는 것이 저희의 사명입니다.
              </p>
              <p>
                언제든지 편안하게 문의해 주시면 친절하게 상담해 드리겠습니다.
              </p>
              <p className="text-right font-semibold mt-8">
                라라재가방문요양센터 대표자 올림
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Profile */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">대표자 프로필</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold">이경빈 대표자</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>경력:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>요양보호사 자격증 보유</li>
                      <li>사회복지사 자격증 보유</li>
                      <li>다년간 요양 서비스 경력</li>
                    </ul>
                    <p className="mt-4"><strong>전문 분야:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>방문요양 서비스 관리</li>
                      <li>요양보호사 교육 및 관리</li>
                      <li>가족 상담 및 케어 플랜 수립</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">찾아오시는 길</h2>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">주소</h3>
                  <p className="text-sm text-gray-600">
                    서울 송파구 송파대로24길 5-14 3층 303호<br />
                    (가락동 104-7) 우편번호 05831
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">전화번호</h3>
                  <p className="text-sm text-gray-600">
                    센터: 02-430-2351<br />
                    대표자: 010-9573-2351
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">이메일</h3>
                  <p className="text-sm text-gray-600">
                    lalavisit@naver.com
                  </p>
                </div>
              </div>
            </div>

            {/* Naver Map */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="aspect-video relative">
                {/* 네이버 지도 임베드 영역 */}
                <iframe
                  src="https://map.naver.com/p/entry/place/2004738980?c=15.00,0,0,0,dh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-semibold mb-2">오시는 방법</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>지하철:</strong> 8호선 가락시장역 6번 출구에서 도보 5분</li>
                  <li><strong>버스:</strong> 문정로데오거리입구 정류장 하차 - 461(간선), 3011/3217/3317(지선), 36(일반)</li>
                  <li><strong>주차:</strong> 건물 주차 가능 (방문 전 문의 바랍니다)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
