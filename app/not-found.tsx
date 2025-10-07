import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-lg text-gray-600">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              홈으로 가기
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
            >
              <Search className="w-5 h-5" />
              서비스 둘러보기
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">자주 찾는 페이지</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/about"
                className="text-sm px-4 py-2 bg-white rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                센터 소개
              </Link>
              <Link
                href="/services"
                className="text-sm px-4 py-2 bg-white rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                서비스 안내
              </Link>
              <Link
                href="/faq"
                className="text-sm px-4 py-2 bg-white rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                자주 묻는 질문
              </Link>
              <Link
                href="/contact"
                className="text-sm px-4 py-2 bg-white rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                상담 신청
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
