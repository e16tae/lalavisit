import { FAQPageSchema } from "@/components/schema-org";

const FAQ_ITEMS = [
  {
    question: "방문요양 서비스는 어떤 분들이 이용할 수 있나요?",
    answer:
      "장기요양등급 1~5등급 또는 인지지원등급 판정을 받으신 어르신께서 이용하실 수 있습니다. 거동이 불편하거나 일상생활에 도움이 필요하신 분들에게 적합합니다.",
  },
  {
    question: "서비스 이용 시간은 어떻게 되나요?",
    answer:
      "24시간 연중무휴로 상담이 가능하며, 방문요양 서비스는 어르신의 필요와 등급에 따라 하루 2~6시간, 주 5~7일 이용하실 수 있습니다.",
  },
  {
    question: "비용은 어떻게 되나요?",
    answer:
      "장기요양보험 적용 시 본인부담금은 15~20% 수준이며, 등급과 서비스 종류에 따라 다릅니다. 자세한 비용은 상담을 통해 안내해 드립니다.",
  },
  {
    question: "서비스 지역은 어디까지인가요?",
    answer:
      "서울특별시 전역, 특히 송파구, 강동구, 강남구를 중심으로 서비스를 제공하고 있습니다. 기타 지역은 상담을 통해 확인 가능합니다.",
  },
  {
    question: "상담은 어떻게 받을 수 있나요?",
    answer:
      "전화(02-430-2351, 010-9573-2351), 카카오톡, 이메일(lalavisit@naver.com) 또는 홈페이지 상담 신청 폼을 통해 문의하실 수 있습니다.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              자주 묻는 질문
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            라라재가방문요양센터 이용에 도움이 되는 핵심 안내를 모았습니다
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4">
                <span className="text-left text-lg font-semibold text-gray-900">
                  {item.question}
                </span>
                <span className="ml-4 text-primary transition-transform duration-200 group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      <FAQPageSchema />
    </section>
  );
}
