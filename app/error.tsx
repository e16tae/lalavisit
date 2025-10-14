"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 로깅 서비스에 기록할 수 있습니다
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              문제가 발생했습니다
            </h1>
            <p className="text-lg text-gray-600">
              페이지를 불러오는 중 오류가 발생했습니다.
              잠시 후 다시 시도해 주세요.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 mt-4">
                오류 코드: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              다시 시도
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
            >
              <Home className="w-5 h-5" />
              홈으로 가기
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">문제가 지속되시나요?</p>
            <Link
              href="/contact"
              className="text-primary font-semibold hover:underline"
            >
              고객 지원 센터로 문의하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
