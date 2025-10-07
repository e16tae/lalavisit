"use client";

import { useState } from "react";
import { Phone, MessageSquare, X, Mail } from "lucide-react";
import Link from "next/link";
import { KakaoIcon } from "./kakao-icon";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const kakaoChannelUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "https://pf.kakao.com/_xnxoxoxG/chat";

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
            <button
              onClick={() => alert('카카오톡 채널은 현재 준비중입니다.\n빠른 시일 내에 오픈하겠습니다.')}
              className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-full shadow-lg cursor-not-allowed border border-gray-300 relative"
            >
              <KakaoIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-500">카카오톡</span>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-2 py-0.5 rounded-full text-gray-800 font-semibold">
                준비중
              </span>
            </button>
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
