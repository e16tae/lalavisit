"use client";

import { useState } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import Link from "next/link";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-5">
            <Link
              href="/contact?action=call"
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 group"
            >
              <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">전화상담</span>
            </Link>
            <Link
              href="/contact?action=kakao"
              className="flex items-center gap-2 bg-[#FEE500] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <MessageSquare className="w-5 h-5 text-[#3C1E1E] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-[#3C1E1E]">카카오톡</span>
            </Link>
            <Link
              href="/contact?action=form"
              className="flex items-center gap-2 bg-secondary text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">상담요청</span>
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
