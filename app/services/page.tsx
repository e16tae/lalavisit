import { Heart, Users, Home, Check, DollarSign, ShoppingCart, FileText } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-org";

export const metadata: Metadata = {
  title: "서비스 안내 - 라라재가방문요양센터",
  description: "방문요양, 가족요양, 입주간병 서비스 안내. 2025년 장기요양 수가 정보, 노인장기요양보험 신청 방법, 복지용구 대여 및 구입 안내",
  keywords: "방문요양서비스, 가족요양비용, 입주간병비용, 장기요양수가, 노인장기요양보험, 복지용구, 요양보호사자격증",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.lalavisit.com/services",
    title: "서비스 안내 - 라라재가방문요양센터",
    description: "전문적이고 체계적인 요양 서비스 제공. 방문요양, 가족요양, 입주간병, 장기요양보험 안내",
    siteName: "라라재가방문요양센터",
  },
  alternates: {
    canonical: "https://www.lalavisit.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://www.lalavisit.com" },
          { name: "서비스 안내", url: "https://www.lalavisit.com/services" },
        ]}
      />
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              서비스 안내
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center">
            전문적이고 체계적인 요양 서비스를 제공합니다
          </p>
        </div>
      </section>

      {/* Home Care Service */}
      <section id="home-care" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">방문요양</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                거동이 불편한 어르신의 가정을 직접 방문하여 신체활동 지원 및 일상생활 지원 서비스를 제공합니다.
                전문 요양보호사가 어르신의 상태에 맞춘 맞춤형 케어를 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-primary">신체활동 지원</h3>
                <ul className="space-y-2">
                  {["세면, 구강관리", "목욕, 몸단장", "식사 도움", "체위 변경", "이동 도움", "운동 도움"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-secondary">일상생활 지원</h3>
                <ul className="space-y-2">
                  {["식사 준비", "청소 및 주변 정돈", "세탁", "외출 동행", "병원 동행", "말벗 및 정서 지원"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="font-semibold mb-2">이용 대상</h3>
              <p className="text-gray-700">
                장기요양등급 1~5등급 또는 인지지원등급을 받으신 어르신
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Care Service */}
      <section id="family-care" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">가족요양</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                가족이 직접 요양보호사 자격을 취득하여 어르신을 돌보는 서비스입니다.
                가족의 손길로 더욱 정성스럽게 케어할 수 있으며, 급여도 지급받을 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-secondary">서비스 특징</h3>
                <ul className="space-y-2">
                  {["가족이 직접 케어", "신뢰할 수 있는 돌봄", "급여 지급", "전문 교육 제공"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-secondary">이용 조건</h3>
                <ul className="space-y-2">
                  {["요양보호사 자격증", "가족 관계 증명", "장기요양등급 보유", "센터 소속 필요"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-secondary">지원 내용</h3>
                <ul className="space-y-2">
                  {["자격증 취득 안내", "서류 작성 지원", "급여 관리", "정기 교육 실시"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-secondary/5 p-6 rounded-xl border-l-4 border-secondary">
              <h3 className="font-semibold mb-2">유의사항</h3>
              <p className="text-gray-700">
                가족요양은 일정 조건을 충족해야 하며, 지역별로 제한이 있을 수 있습니다. 자세한 사항은 상담을 통해 안내드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live-in Care Service */}
      <section id="live-in-care" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">입주간병</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                24시간 전문 간병인이 상주하며 어르신을 돌보는 서비스입니다.
                병원이나 요양시설, 자택에서 안심하고 생활할 수 있도록 전문적인 케어를 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-primary">24시간 케어</h3>
                <ul className="space-y-2">
                  {["전문 간병인 상주", "24시간 건강 모니터링", "응급상황 대응", "야간 케어 포함", "식사 및 투약 관리"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-primary">전문 서비스</h3>
                <ul className="space-y-2">
                  {["위생 관리", "체위 변경", "재활 보조", "정서적 지원", "가족과의 소통"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary mb-8">
              <h3 className="font-semibold mb-2">이용 장소</h3>
              <p className="text-gray-700">
                자택, 병원, 요양시설 등 어디서든 입주간병 서비스를 이용하실 수 있습니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl">
              <h3 className="font-semibold text-lg mb-4">맞춤형 서비스</h3>
              <p className="text-gray-700 mb-4">
                어르신의 상태와 필요에 따라 케어 플랜을 수립하고, 정기적으로 모니터링하여 최적의 서비스를 제공합니다.
              </p>
              <p className="text-gray-700">
                가족과 긴밀하게 소통하여 어르신의 상태 변화를 공유하고, 함께 최선의 케어 방법을 찾아갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-term Care Insurance */}
      <section id="insurance" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">노인장기요양보험</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                고령이나 노인성 질병 등으로 일상생활이 어려운 어르신에게 신체활동 및 일상생활 지원 서비스를 제공하는 사회보험제도입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-primary">신청 대상</h3>
                <ul className="space-y-2">
                  {["만 65세 이상 노인", "65세 미만 노인성 질병자", "치매, 뇌혈관질환, 파킨슨병 등", "일상생활이 어려운 분"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-primary">신청 방법</h3>
                <ul className="space-y-2">
                  {["국민건강보험공단 방문", "전화 신청 (1577-1000)", "인터넷 신청 (노인장기요양보험)", "우편 신청 가능"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="font-semibold text-lg mb-4 text-primary">장기요양등급</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">등급</th>
                      <th className="px-4 py-3 text-left font-semibold">상태</th>
                      <th className="px-4 py-3 text-left font-semibold">점수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 font-medium">1등급</td>
                      <td className="px-4 py-3">일상생활 전적으로 다른 사람의 도움이 필요</td>
                      <td className="px-4 py-3">95점 이상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">2등급</td>
                      <td className="px-4 py-3">일상생활 상당 부분 다른 사람의 도움이 필요</td>
                      <td className="px-4 py-3">75점 이상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">3등급</td>
                      <td className="px-4 py-3">일상생활 부분적으로 다른 사람의 도움이 필요</td>
                      <td className="px-4 py-3">60점 이상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">4등급</td>
                      <td className="px-4 py-3">일상생활 일정 부분 다른 사람의 도움이 필요</td>
                      <td className="px-4 py-3">51점 이상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">5등급</td>
                      <td className="px-4 py-3">치매 환자 (경증)</td>
                      <td className="px-4 py-3">45점 이상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">인지지원등급</td>
                      <td className="px-4 py-3">치매 환자 (경증 인지장애)</td>
                      <td className="px-4 py-3">45점 미만</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="font-semibold mb-2">문의 및 상담</h3>
              <p className="text-gray-700">
                장기요양보험 신청 및 등급 판정에 대한 자세한 상담은 저희 센터로 연락주시면 친절하게 안내해 드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 Care Costs */}
      <section id="care-costs" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">2025년 방문요양 이용요금</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                2025년 장기요양 급여비용 및 본인부담금 안내입니다. (평균 3.93% 인상)
                실제 이용 시간과 등급에 따라 본인부담금이 달라집니다.
              </p>
            </div>

            {/* 시간별 이용요금 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4">
                <h3 className="font-semibold text-lg">방문요양 시간별 이용요금 (2025년)</h3>
                <p className="text-sm text-gray-600 mt-1">총 재가급여비용 및 본인부담금</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">이용시간</th>
                      <th className="px-6 py-3 text-right font-semibold">총 비용</th>
                      <th className="px-6 py-3 text-right font-semibold">본인부담금 (15%)</th>
                      <th className="px-6 py-3 text-right font-semibold">본인부담금 (9%)</th>
                      <th className="px-6 py-3 text-right font-semibold">본인부담금 (6%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">30분</td>
                      <td className="px-6 py-4 text-right">16,940원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">2,541원</td>
                      <td className="px-6 py-4 text-right text-gray-600">1,525원</td>
                      <td className="px-6 py-4 text-right text-gray-600">1,016원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">60분</td>
                      <td className="px-6 py-4 text-right">24,580원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">3,687원</td>
                      <td className="px-6 py-4 text-right text-gray-600">2,212원</td>
                      <td className="px-6 py-4 text-right text-gray-600">1,475원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">90분</td>
                      <td className="px-6 py-4 text-right">33,120원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">4,968원</td>
                      <td className="px-6 py-4 text-right text-gray-600">2,981원</td>
                      <td className="px-6 py-4 text-right text-gray-600">1,987원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">120분</td>
                      <td className="px-6 py-4 text-right">42,160원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">6,324원</td>
                      <td className="px-6 py-4 text-right text-gray-600">3,794원</td>
                      <td className="px-6 py-4 text-right text-gray-600">2,530원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">150분</td>
                      <td className="px-6 py-4 text-right">49,160원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">7,374원</td>
                      <td className="px-6 py-4 text-right text-gray-600">4,424원</td>
                      <td className="px-6 py-4 text-right text-gray-600">2,950원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">180분</td>
                      <td className="px-6 py-4 text-right">55,350원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">8,303원</td>
                      <td className="px-6 py-4 text-right text-gray-600">4,982원</td>
                      <td className="px-6 py-4 text-right text-gray-600">3,321원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">210분</td>
                      <td className="px-6 py-4 text-right">61,670원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">9,251원</td>
                      <td className="px-6 py-4 text-right text-gray-600">5,550원</td>
                      <td className="px-6 py-4 text-right text-gray-600">3,700원</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">240분</td>
                      <td className="px-6 py-4 text-right">68,030원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">10,205원</td>
                      <td className="px-6 py-4 text-right text-gray-600">6,118원</td>
                      <td className="px-6 py-4 text-right text-gray-600">4,082원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 등급별 월 한도액 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-secondary/10 to-primary/10 px-6 py-4">
                <h3 className="font-semibold text-lg">등급별 재가급여 월 한도액 (2025년)</h3>
                <p className="text-sm text-gray-600 mt-1">재가서비스 이용 시 월 최대 한도액</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">등급</th>
                      <th className="px-6 py-3 text-right font-semibold">월 한도액</th>
                      <th className="px-6 py-3 text-right font-semibold">본인부담금 (15%)</th>
                      <th className="px-6 py-3 text-right font-semibold">최대 이용시간 (120분 기준)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">1등급</td>
                      <td className="px-6 py-4 text-right">2,306,400원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">345,960원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 54.7회</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">2등급</td>
                      <td className="px-6 py-4 text-right">2,083,400원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">312,510원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 49.4회</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">3등급</td>
                      <td className="px-6 py-4 text-right">1,485,700원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">222,855원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 35.2회</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">4등급</td>
                      <td className="px-6 py-4 text-right">1,370,600원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">205,590원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 32.5회</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">5등급</td>
                      <td className="px-6 py-4 text-right">1,177,000원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">176,550원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 27.9회</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">인지지원등급</td>
                      <td className="px-6 py-4 text-right">657,400원</td>
                      <td className="px-6 py-4 text-right text-secondary font-semibold">98,610원</td>
                      <td className="px-6 py-4 text-right text-gray-600">약 15.6회</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-secondary/5 p-6 rounded-xl border-l-4 border-secondary">
                <h3 className="font-semibold mb-3">본인부담금 구분</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span><strong>15%:</strong> 일반 수급자</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span><strong>9%:</strong> 차상위계층 (40% 경감)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span><strong>6%:</strong> 차상위계층 (60% 경감)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span><strong>0%:</strong> 기초생활수급자, 의료급여 수급자</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <h3 className="font-semibold mb-3">이용 안내</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>월 한도액 범위 내에서 자유롭게 이용 가능</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>주말 및 공휴일 가산 비용 별도 적용</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>지역 및 시간대에 따른 가산 가능</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>자세한 비용은 상담을 통해 안내</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
              <h3 className="font-semibold mb-2 text-yellow-800">안내사항</h3>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• 위 금액은 2025년 1월 기준이며, 보건복지부 고시에 따라 변경될 수 있습니다.</li>
                <li>• 월 한도액 초과 시 전액 본인부담으로 이용 가능합니다.</li>
                <li>• 지역, 시간대(야간/공휴일)에 따라 가산금이 추가될 수 있습니다.</li>
                <li>• 정확한 비용 및 이용 계획은 상담을 통해 안내해 드립니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Welfare Equipment */}
      <section id="welfare-equipment" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">복지용구</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                일상생활 또는 신체활동 지원에 필요한 용구를 저렴하게 구입하거나 대여할 수 있는 서비스입니다.
                장기요양등급을 받으신 분은 복지용구 구입 및 대여 비용의 일부를 지원받을 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-primary">대여 품목</h3>
                <ul className="space-y-2">
                  {[
                    "수동 휠체어 / 전동 휠체어",
                    "전동침대 / 수동침대",
                    "이동욕조 / 목욕리프트",
                    "배회감지기 / 경사로",
                    "보행기 / 보행차",
                    "욕창예방매트리스"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-primary">구입 품목</h3>
                <ul className="space-y-2">
                  {[
                    "보행보조차 / 지팡이",
                    "욕창예방방석",
                    "이동변기 / 목욕의자",
                    "안전손잡이 / 미끄럼방지용품",
                    "간이변기 / 지지대",
                    "자세변환용구"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="font-semibold text-lg mb-4 text-primary">본인부담금</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">일반 수급자</span>
                  <span className="text-secondary font-semibold">15% 부담</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">의료급여 수급자</span>
                  <span className="text-secondary font-semibold">전액 무료</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">차상위계층</span>
                  <span className="text-secondary font-semibold">6% 부담 (60% 경감)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <h3 className="font-semibold mb-3">연간 한도액</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-primary">대여:</span> 연간 180만원
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-primary">구입:</span> 연간 160만원
                </p>
              </div>

              <div className="bg-secondary/5 p-6 rounded-xl border-l-4 border-secondary">
                <h3 className="font-semibold mb-3">신청 방법</h3>
                <p className="text-gray-700 text-sm">
                  복지용구 사업소 또는 저희 센터를 통해 신청하실 수 있습니다.
                  상담을 통해 필요한 용구를 추천해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            어떤 서비스가 필요하신가요?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            전문 상담을 통해 최적의 서비스를 안내해 드립니다
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105"
          >
            상담 신청하기
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
