# Lalavisit | Engineering Workflow

개발자가 템플릿을 유지보수하고 배포할 때 따라야 할 브랜치 전략, 코드 리뷰 규칙, 자동화 파이프라인을 설명합니다.

## 브랜치 전략

```
develop ──┬── feature/<topic>
          └── agent/<issue-id>
             (자동화 에이전트 작업)
   ↓
main (배포 브랜치)
```

- **develop**: 기능 개발 및 통합 테스트를 위한 기본 브랜치입니다.
- **feature/**: 사람이 수행하는 작업용 브랜치입니다.
- **agent/**: 자동화 에이전트가 수행하는 작업용 브랜치입니다. 브랜치명은 `agent/<issue-id>-<slug>` 형식으로 만듭니다.
- **main**: 프로덕션 릴리스 전용. 모든 변경은 리뷰를 통과한 후 merge되며, push 시 CD 파이프라인이 실행됩니다.

## 자동화 에이전트 협업 흐름

1. **이슈 준비**
   - 작업 내용을 Issue에 정리하고 `automation-ready` 라벨을 부여합니다.
   - 필요한 입력(디자인, 예시 데이터 등)을 첨부합니다.

2. **브랜치 생성**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b agent/123-optimize-seo
   ```
   - 에이전트는 해당 브랜치에서 작업합니다.
   - 사람이 후속 수정을 하게 되면 같은 브랜치에서 커밋을 이어갑니다.

3. **작업 및 테스트**
   - `npm run check` (lint + typecheck) 등 관련 검증을 실행하고 결과를 Issue/PR에 첨부합니다.

4. **PR 생성**
   - 제목 예시: `feat: improve seo metadata`
   - 본문에 실행한 명령어와 출력 요약, 알려진 제한사항을 기재합니다.

5. **검수 & 리뷰**
   - 사람이 코드 리뷰를 진행하고 보완 사항을 반영합니다.
   - 모든 체크가 통과하면 승인합니다.

6. **develop 병합**
   ```bash
   git checkout develop
   git merge --no-ff agent/123-optimize-seo
   git push origin develop
   ```
   - 완료 후 에이전트 브랜치는 삭제합니다.

7. **main 배포**
   - main으로 PR을 열어 승인 후 merge하면 배포가 진행됩니다.

> 자동화 에이전트가 생성한 커밋이라도 사람 검토 없이 main에 병합하지 않습니다.

## 일반 작업 흐름

1. 최신 코드 가져오기  
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. 기능 브랜치 생성 (선택)  
   ```bash
   git checkout -b feat/update-hero-section
   ```
3. 코드 작성 및 테스트  
   - `npm run lint` / `npm run test` (테스트 추가 시) / `npm run build`
4. 커밋  
   ```bash
   git commit -m "feat: hero 섹션 CTA 개선"
   ```
5. develop에 푸시 → GitHub Actions CI 실행  
   ```bash
   git push origin feat/update-hero-section
   ```
6. PR 생성 후 리뷰 & merge  
7. main에 병합되면 CD 파이프라인이 자동으로 배포 수행  
8. 배포 후 `develop` 브랜치를 `main`으로 동기화  
   ```bash
   git checkout develop
   git merge main
   git push origin develop
   ```

## 커밋 메시지 컨벤션

`type(scope): description` 패턴을 권장합니다.

| type | 설명 |
| ---- | ---- |
| `feat` | 신규 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 |
| `style` | 스타일/레이아웃 변경 (로직 영향 X) |
| `refactor` | 리팩터링 |
| `chore` | 설정/스クリ립트/의존성 관리 |

예시: `feat(contact): 상담 폼 검증 강화`

## GitHub Actions 파이프라인

워크플로: `.github/workflows/cd-production.yaml`

| 단계 | 브랜치 | 주요 작업 |
| ---- | ------ | -------- |
| CI | `develop` | ESLint, TypeScript 타입 검사, Next.js 빌드, Docker 이미지 테스트 빌드 |
| CD | `main` | Docker 이미지 빌드 & GHCR 푸시, `k8s/overlays/production` 이미지 태그 업데이트, ArgoCD 동기화 |

### 필수 Secrets

| 이름 | 설명 |
| ---- | ---- |
| `GH_PAT` | GHCR push 및 매니페스트 업데이트용 PAT |
| `ARGOCD_SERVER` | ArgoCD API 엔드포인트 |
| `ARGOCD_TOKEN` | ArgoCD 토큰 (`argocd account generate-token`) |

### 실패 시 대응

- **Docker 빌드 실패**: Dockerfile 변경 사항, Node 버전, 빌드 캐시를 확인합니다.
- **Manifest 업데이트 실패**: `GH_PAT` 권한 또는 보호 브랜치 설정을 확인합니다.
- **ArgoCD Sync 실패**: 토큰 유효성, ArgoCD RBAC, 애플리케이션 상태를 확인합니다.

## 코드 리뷰 체크포인트

- 외부 공개에 부적절한 정보(주소, 이메일 등)가 하드코딩되어 있지 않은가?
- `.env.example`와 실제 코드가 참조하는 환경 변수 이름이 맞는가?
- Lighthouse 성능/접근성 저하 요소가 없는가?
- 다국어/한국어 콘텐츠가 맞춤법, 존칭을 준수하는가?
- 자동화 에이전트가 남긴 테스트 로그가 충분하고 재현 가능한가?

## 배포 후 점검

1. GitHub Actions가 성공했는지 확인
2. ArgoCD에서 애플리케이션 상태가 `Healthy/Synced`인지 확인
3. `https://www.example.com` 접근 후 주요 흐름 테스트
4. `scripts/healthcheck.sh` (존재하는 경우) 실행 또는 수동 헬스체크
5. DNS, SSL, Search Console 검증 상태 확인

## 일일/주간 운영 루틴

- **일일**: 문의 메일 수신 여부 확인, 웹사이트 주요 페이지 모니터링
- **주간**: Lighthouse/Pagespeed 검사, Schema.org 유효성 검사, 로그 확인
- **월간**: 의존성 업데이트 점검, 시크릿/인증서 만료일 확인, 문서 업데이트
