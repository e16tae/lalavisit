"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, Mail, Send, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "방문요양",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "call") {
      // 전화 섹션으로 스크롤
      document.getElementById("phone-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "kakao") {
      // 카카오톡 섹션으로 스크롤
      document.getElementById("kakao-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "form") {
      // 상담요청 섹션으로 스크롤
      document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // API 호출
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          service: "방문요양",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <a
                href="http://pf.kakao.com/_xYOUR_KAKAO_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FEE500] text-[#3C1E1E] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                카카오톡 채널 열기
              </a>
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

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="성함을 입력해주세요"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    문의 서비스 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="방문요양">방문요양</option>
                    <option value="가족요양">가족요양</option>
                    <option value="입주간병">입주간병</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="문의하실 내용을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "전송 중..."
                  ) : (
                    <>
                      상담 신청하기
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                    상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                    전송 중 오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                )}
              </div>
            </form>
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
