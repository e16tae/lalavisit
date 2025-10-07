# 관리자 가이드

라라재가방문요양센터 웹사이트의 콘텐츠 관리 가이드입니다.

## 목차

1. [블로그 글 관리](#블로그-글-관리)
2. [활동 사진 관리](#활동-사진-관리)
3. [후기 관리](#후기-관리)
4. [환경 변수 설정](#환경-변수-설정)

---

## 블로그 글 관리

### 블로그 글 추가하기

1. `data/blog-posts.json` 파일을 엽니다.
2. `posts` 배열에 새로운 글을 추가합니다:

```json
{
  "id": "unique-post-id",
  "title": "글 제목",
  "excerpt": "요약 (1-2줄)",
  "content": "본문 내용입니다.\n\n문단은 \\n\\n으로 구분합니다.\n\n**제목**은 **로 감싸면 h2 태그로 표시됩니다.",
  "category": "공지사항 | 돌봄 정보 | 제도 안내",
  "author": "작성자 이름",
  "publishedAt": "2025-01-15",
  "thumbnail": "/blog/이미지파일명.jpg"
}
```

3. 파일을 저장하면 자동으로 반영됩니다.

### 블로그 글 수정하기

1. `data/blog-posts.json`에서 수정할 글을 찾습니다.
2. 원하는 필드를 수정합니다.
3. 저장하면 즉시 반영됩니다.

### 블로그 글 삭제하기

1. `data/blog-posts.json`에서 해당 객체를 삭제합니다.
2. 저장하면 목록에서 사라집니다.

---

## 활동 사진 관리

### 활동 사진 추가하기

1. `data/activities.json` 파일을 엽니다.
2. `field` (현장 사진) 또는 `education` (교육 사진) 배열에 추가:

**현장 사진 예시:**
```json
{
  "id": 7,
  "title": "활동 제목",
  "description": "활동 설명",
  "date": "2025-01-15",
  "careGrade": "3등급",
  "service": "방문요양",
  "image": "/activities/field/photo.jpg"
}
```

**교육 사진 예시:**
```json
{
  "id": 4,
  "title": "교육 제목",
  "description": "교육 설명",
  "date": "2025-01-15",
  "educationType": "정기 교육",
  "hours": "4시간",
  "image": "/activities/education/photo.jpg"
}
```

3. 실제 이미지는 `public/activities/field/` 또는 `public/activities/education/` 폴더에 저장합니다.
4. 저장하면 갤러리에 표시됩니다.

---

## 후기 관리

### 후기 추가하기

1. `data/reviews.json` 파일을 엽니다.
2. `reviews` 배열에 새로운 후기를 추가합니다:

```json
{
  "id": 7,
  "name": "김**",
  "grade": "3등급",
  "service": "방문요양 | 가족요양 | 입주간병",
  "rating": 5,
  "comment": "후기 내용입니다. 서비스에 대한 만족도를 작성해 주세요.",
  "date": "2025-01-15"
}
```

3. 저장하면 홈 페이지 후기 섹션에 표시됩니다.

### 후기 수정/삭제

- 수정: 해당 객체의 필드를 수정
- 삭제: 해당 객체를 배열에서 제거

---

## 환경 변수 설정

### Google Analytics 설정

1. `.env.local` 파일을 생성합니다 (없으면).
2. Google Analytics ID를 추가합니다:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. 서버를 재시작하면 적용됩니다.

### 이메일 설정 (Contact Form)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@lalavisit.com
EMAIL_TO=lalavisit@naver.com
```

### 카카오톡 채널 URL 변경

```bash
NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xnxoxoxG/chat
```

플로팅 버튼의 카카오톡 링크를 변경하려면:
1. `components/floating-contact.tsx` 파일을 엽니다.
2. 24번째 줄의 `href` 값을 수정합니다.

---

## 기타 팁

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 데이터 백업

변경하기 전에 `data/` 폴더를 복사해 두세요.

### 이미지 최적화

- 이미지는 WebP 또는 AVIF 형식으로 변환하면 로딩 속도가 빨라집니다.
- 권장 사이즈: 1200x800px

---

문의사항이 있으시면 개발팀에 연락해 주세요.
