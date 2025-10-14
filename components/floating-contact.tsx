"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";
import { KakaoIcon } from "./kakao-icon";

export function FloatingContact() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || "_xnxoxoxG";
  const kakaoChatUrl = `https://pf.kakao.com/${kakaoChannelId}/chat`;

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if footer is visible in viewport
      setIsFooterVisible(footerRect.top < windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-6 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        isFooterVisible ? 'bottom-[240px] md:bottom-[200px]' : 'bottom-6'
      }`}
      role="group"
      aria-label="빠른 문의"
    >
      {/* Phone */}
      <a
        href="tel:02-430-2351"
        className="group relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-110"
        aria-label="전화 상담: 02-430-2351"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          전화상담
        </span>
      </a>

      {/* KakaoTalk */}
      <a
        href={kakaoChatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#FEE500] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110"
        aria-label="카카오톡 채팅 상담"
      >
        <KakaoIcon className="w-6 h-6 text-[#3C1E1E]" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          카카오톡
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:lalavisit@naver.com"
        className="group relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-110"
        aria-label="이메일 문의: lalavisit@naver.com"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center">
          <Mail className="w-6 h-6 text-secondary" />
        </div>
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          이메일
        </span>
      </a>

      {/* Contact Form */}
      <Link
        href="/contact?action=form"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110"
        aria-label="상담 신청서 작성"
      >
        <MessageSquare className="w-6 h-6" />
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-ping opacity-20"></span>
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          상담신청
        </span>
      </Link>
    </div>
  );
}
