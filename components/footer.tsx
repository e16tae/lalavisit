import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t mt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Image src="/logo.svg" alt="라라재가방문요양 로고" width={24} height={24} />
                </div>
              </div>
              <span className="text-lg font-bold gradient-text">
                라라재가방문요양센터
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              사랑과 정성으로 어르신들의<br />건강한 일상을 함께합니다.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-primary" />
              <span>서울 송파구 가락동</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 relative inline-block">
              바로가기
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-smooth inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  센터 소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-primary transition-smooth inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  서비스 안내
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-600 hover:text-primary transition-smooth inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  활동 갤러리
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-smooth inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  상담 신청
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 relative inline-block">
              연락처
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div>센터: 02-430-2351</div>
                  <div className="text-xs text-gray-500">대표자: 010-9573-2351</div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:lalavisit@naver.com" className="hover:text-primary transition-colors">
                  lalavisit@naver.com
                </a>
              </li>
              <li className="text-gray-500 text-xs pt-2">
                팩스: 02-430-2352
              </li>
            </ul>
          </div>

          {/* Organization info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 relative inline-block">
              기관 정보
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>기관기호: 2-11710-00469</div>
                  <div>고유번호: 530-80-03437</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} 라라재가방문요양센터. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-primary transition-colors">센터 소개</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">문의하기</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
