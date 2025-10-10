"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Phone, MessageSquare, Mail, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ContactFormSkeleton } from "./contact-form-skeleton";

// Dynamic import for ContactForm (reduces initial bundle size)
const ContactForm = dynamic(() => import("./contact-form").then((mod) => ({ default: mod.ContactForm })), {
  loading: () => <ContactFormSkeleton />,
  ssr: false,
});

export default function ContactPage() {
  const searchParams = useSearchParams();
  const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || "_xnxoxoxG";
  const kakaoAddUrl = `https://pf.kakao.com/${kakaoChannelId}/friend`;
  const kakaoChatUrl = `https://pf.kakao.com/${kakaoChannelId}/chat`;

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "call") {
      // 전화 섹션으로 스크롤
      document.getElementById("phone-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "kakao") {
      // 카카오톡 섹션으로 스크롤
      document.getElementById("kakao-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "form") {
      // 상담요청 섹션으로 스크롤 (헤더와 패딩을 고려하여 offset 적용)
      const element = document.getElementById("form-section");
      if (element) {
        const offset = 80; // 헤더 높이 + 여백
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              문의하기
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center">
            편하신 방법으로 문의해 주세요
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phone Contact */}
            <div id="phone-section" className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">전화 상담</h3>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">센터</p>
                  <a
                    href="tel:02-430-2351"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    02-430-2351
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">팩스</p>
                  <span className="text-lg font-semibold text-primary">
                    02-430-2352
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">센터장</p>
                  <a
                    href="tel:010-9573-2351"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    010-9573-2351
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                24시간 연중무휴
              </p>
            </div>

            {/* Kakao Contact */}
            <div id="kakao-section" className="bg-gradient-to-br from-[#FEE500]/30 to-[#FEE500]/10 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-[#FEE500] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-[#3C1E1E]" />
              </div>
              <h3 className="text-xl font-bold mb-4">카카오톡 상담</h3>
              <p className="text-gray-600 mb-6">
                실시간 채팅으로 빠른 상담이 가능합니다
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={kakaoAddUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#3C1E1E] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all border-2 border-[#FEE500]"
                >
                  친구 추가하기
                </a>
                <a
                  href={kakaoChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FEE500] text-[#3C1E1E] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  바로 채팅하기
                </a>
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">이메일</h3>
              <p className="text-gray-600 mb-6">
                언제든지 이메일로 문의하세요
              </p>
              <a
                href="mailto:lalavisit@naver.com"
                className="text-lg font-semibold text-secondary hover:underline"
              >
                lalavisit@naver.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">상담 신청하기</h2>
              <p className="text-gray-600">
                정보를 입력하시면 빠른 시일 내에 연락드리겠습니다
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4">운영 시간 안내</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="text-lg font-semibold text-primary">24시간 연중무휴</p>
                    <p className="text-sm text-gray-600 mt-4">
                      언제든지 편하신 시간에 연락 주시면 친절하게 상담해 드리겠습니다.
                    </p>
                    <p className="text-sm text-gray-600">
                      ※ 긴급한 경우 센터장 휴대폰(010-9573-2351)으로 연락 주시기 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
