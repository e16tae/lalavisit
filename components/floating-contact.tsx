"use client";

import { useState } from "react";
import { Phone, MessageSquare, X, Mail } from "lucide-react";
import Link from "next/link";
import { KakaoIcon } from "./kakao-icon";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || "_xnxoxoxG";
  const kakaoChatUrl = `https://pf.kakao.com/${kakaoChannelId}/chat`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Backdrop for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Contact menu */}
        {isOpen && (
          <div
            id="floating-contact-menu"
            className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300"
            role="menu"
            aria-label="문의 방법 선택"
          >
            <a
              href="tel:02-430-2351"
              className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">전화상담</span>
                <span className="text-xs text-gray-500">02-430-2351</span>
              </div>
            </a>

            <a
              href={kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#FEE500] px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <KakaoIcon className="w-5 h-5 text-[#3C1E1E]" />
              </div>
              <span className="text-sm font-semibold text-[#3C1E1E]">카카오톡 채팅</span>
            </a>

            <a
              href="mailto:lalavisit@naver.com"
              className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-semibold text-gray-900">이메일</span>
            </a>

            <Link
              href="/contact?action=form"
              className="flex items-center gap-3 bg-gradient-to-r from-secondary to-primary text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">상담신청</span>
            </Link>
          </div>
        )}

        {/* Main floating button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="relative bg-gradient-to-r from-primary to-secondary text-white p-4 h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
          aria-label={isOpen ? "문의 메뉴 닫기" : "문의 메뉴 열기"}
          aria-expanded={isOpen}
          aria-controls="floating-contact-menu"
        >
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-ping opacity-20"></span>

          <div className="relative transition-transform duration-300 group-hover:rotate-12">
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageSquare className="w-7 h-7" />
            )}
          </div>
        </Button>
      </div>
    </>
  );
}
