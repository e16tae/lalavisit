# SEO 설정 가이드

라라재가방문요양센터 웹사이트의 검색엔진 최적화(SEO) 설정 가이드입니다.

## 📋 목차

1. [Google Search Console 등록](#1-google-search-console-등록)
2. [Naver Search Advisor 등록](#2-naver-search-advisor-등록)
3. [환경변수 설정](#3-환경변수-설정)
4. [검색엔진 최적화 체크리스트](#4-검색엔진-최적화-체크리스트)

---

## 1. Google Search Console 등록

### 1.1 Google Search Console 접속
- URL: https://search.google.com/search-console
- Google 계정으로 로그인

### 1.2 속성 추가
1. 좌측 상단 속성 선택 드롭다운 클릭
2. `+ 속성 추가` 클릭
3. **URL 접두어** 방식 선택
4. `https://www.lalavisit.com` 입력 후 계속

### 1.3 소유권 확인
1. **HTML 태그** 방식 선택
2. 메타 태그 코드 복사 (예: `<meta name="google-site-verification" content="ABC123...">`)
3. `content` 속성의 값만 복사 (예: `ABC123...`)
4. `.env.local` 파일에 추가:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123...
   ```
5. 프로젝트 재빌드 및 배포
6. Google Search Console에서 `확인` 버튼 클릭

### 1.4 Sitemap 제출
1. 좌측 메뉴에서 `Sitemaps` 선택
2. 새 사이트맵 추가: `https://www.lalavisit.com/sitemap.xml`
3. `제출` 클릭

### 1.5 주요 설정
- **URL 검사**: 개별 페이지 색인 요청
- **실적 보고서**: 검색 트래픽 분석
- **커버리지**: 색인 상태 확인

---

## 2. Naver Search Advisor 등록

### 2.1 Naver Search Advisor 접속
- URL: https://searchadvisor.naver.com
- Naver 계정으로 로그인

### 2.2 웹마스터 도구
1. 상단 메뉴에서 `웹마스터 도구` 선택
2. `사이트 등록` 클릭
3. `https://www.lalavisit.com` 입력 후 확인

### 2.3 소유권 확인
1. **HTML 태그** 방식 선택
2. 메타 태그 코드 복사 (예: `<meta name="naver-site-verification" content="XYZ789...">`)
3. `content` 속성의 값만 복사 (예: `XYZ789...`)
4. `.env.local` 파일에 추가:
   ```
   NEXT_PUBLIC_NAVER_SITE_VERIFICATION=XYZ789...
   ```
5. 프로젝트 재빌드 및 배포
6. Naver Search Advisor에서 `소유확인` 버튼 클릭

### 2.4 사이트맵 제출
1. 좌측 메뉴에서 `요청` > `사이트맵 제출` 선택
2. `https://www.lalavisit.com/sitemap.xml` 입력
3. `확인` 클릭

### 2.5 RSS 제출 (선택사항)
- 블로그 RSS가 있는 경우 제출

### 2.6 주요 설정
- **검색 반영**: 수집 및 색인 상태 확인
- **웹 페이지 수집**: 페이지별 수집 요청
- **검색어 통계**: 유입 검색어 분석

---

## 3. 환경변수 설정

### 3.1 로컬 개발 환경

`.env.local` 파일 수정:

```bash
# 검색엔진 사이트 소유권 인증
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=여기에_구글_인증코드_입력
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=여기에_네이버_인증코드_입력
```

### 3.2 프로덕션 환경 (Kubernetes)

`k8s/secret.yaml` 파일 수정:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: lalavisit-secrets
  namespace: lalavisit
type: Opaque
stringData:
  # ... 기존 설정 ...

  # 검색엔진 사이트 소유권 인증
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "여기에_구글_인증코드_입력"
  NEXT_PUBLIC_NAVER_SITE_VERIFICATION: "여기에_네이버_인증코드_입력"
```

배포:
```bash
kubectl apply -f k8s/secret.yaml
kubectl rollout restart deployment/lalavisit -n lalavisit
```

---

## 4. 검색엔진 최적화 체크리스트

### ✅ 기본 SEO 설정 (완료)
- [x] robots.txt 설정
- [x] sitemap.xml 생성
- [x] 메타 태그 최적화 (title, description, keywords)
- [x] Open Graph 태그
- [x] Twitter Card 태그
- [x] Schema.org 구조화된 데이터 (LocalBusiness, Service)
- [x] 반응형 디자인
- [x] 시맨틱 HTML

### 📝 추가로 해야 할 작업

#### Google Search Console
- [ ] 소유권 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 모든 페이지 색인 확인
- [ ] Core Web Vitals 점검
- [ ] 모바일 사용성 확인

#### Naver Search Advisor
- [ ] 소유권 확인 완료
- [ ] Sitemap 제출 완료
- [ ] 모든 페이지 수집 확인
- [ ] 웹페이지 최적화 점수 확인

#### 콘텐츠 최적화
- [ ] 각 페이지별 고유한 제목과 설명
- [ ] 키워드 자연스러운 배치
- [ ] 이미지 alt 텍스트 추가
- [ ] 내부 링크 구조 개선
- [ ] 페이지 로딩 속도 최적화

#### 지역 SEO
- [ ] Google My Business 등록
- [ ] Naver 플레이스 등록
- [ ] 지역 키워드 최적화 (송파구, 가락동 등)
- [ ] 지역 디렉토리 등록

---

## 📊 SEO 모니터링

### 주요 지표
1. **검색 노출**: Google/Naver에서 사이트 검색 시 노출 여부
2. **색인 페이지 수**: 검색엔진에 등록된 페이지 수
3. **검색 유입**: 검색을 통한 방문자 수
4. **검색어 순위**: 주요 키워드 검색 순위

### 정기 점검 (월 1회)
- Google Search Console 실적 보고서
- Naver Search Advisor 검색어 통계
- Core Web Vitals 점수
- 페이지 속도 측정 (PageSpeed Insights)

---

## 🔗 유용한 링크

- [Google Search Console](https://search.google.com/search-console)
- [Naver Search Advisor](https://searchadvisor.naver.com)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Schema.org 문서](https://schema.org)

---

## 📞 문의

SEO 설정 관련 문의사항이 있으시면 개발팀에 연락주세요.
