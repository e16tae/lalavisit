import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo.svg" alt="라라방문 로고" width={32} height={32} />
              <span className="text-lg font-bold bg-gradient-to-r from-[#22BBB4] to-[#00ACE2] bg-clip-text text-transparent">
                라라재가방문요양센터
              </span>
            </div>
            <p className="text-sm text-gray-600">
              믿을 수 있는 방문요양 서비스를 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">메뉴</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-primary transition-colors">소개</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">서비스</Link></li>
              <li><Link href="/activities" className="hover:text-primary transition-colors">활동</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">문의</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>센터: 02-430-2351</li>
              <li>팩스: 02-430-2352</li>
              <li>센터장: 010-9573-2351</li>
              <li>이메일: lalavisit@naver.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">기관 정보</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>기관기호: 2-11710-00469</li>
              <li>고유번호증: 530-80-03437</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 라라재가방문요양센터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
