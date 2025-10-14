"use client";

import { AlertCircle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="max-w-2xl mx-auto text-center p-8">
            <div className="inline-block p-6 bg-white rounded-full mb-6 shadow-lg">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              시스템 오류
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              예기치 않은 오류가 발생했습니다.
              불편을 드려 죄송합니다.
            </p>
            <button
              onClick={reset}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
