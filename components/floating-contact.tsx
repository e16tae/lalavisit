"use client";

import { useState } from "react";
import { Phone, MessageSquare, X, Mail } from "lucide-react";
import Link from "next/link";
import { KakaoIcon } from "./kakao-icon";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || "_xnxoxoxG";
  const kakaoChatUrl = `https://pf.kakao.com/${kakaoChannelId}/chat`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-5">
            <a
              href="tel:02-430-2351"
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 group"
            >
              <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">전화상담</span>
            </a>
            <a
              href={kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FEE500] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-[#FEE500] group"
            >
              <KakaoIcon className="w-5 h-5 text-[#3C1E1E] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-[#3C1E1E]">카카오톡 채팅</span>
            </a>
            <a
              href="mailto:lalavisit@naver.com"
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 group"
            >
              <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">이메일</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-secondary text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">상담신청</span>
            </Link>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}
