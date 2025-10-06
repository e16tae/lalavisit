import { Heart, Users, Home, Check } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
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
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
