# Lalavisit | Security & Public Release

공개 저장소로 운영되는 템플릿이 안전하게 배포될 수 있도록 보안 정책, 비밀 정보 관리, 공개 전 점검 절차를 정리합니다.

## 1. 보안 이슈 보고
- 취약점을 발견하면 공개 이슈 대신 GitHub Security Advisory 또는 담당자 비공개 연락 수단(이메일)을 사용해 신고합니다.
- 재현 방법, 영향 범위, 임시 완화 방안을 포함해 보고하면 빠르게 대응할 수 있습니다.

## 2. 비밀 정보 관리 원칙
- `.env*` 파일은 절대 커밋하지 않습니다. Git 기록에 민감 정보가 포함된 경우 즉시 자격 증명을 회수하고 히스토리를 정리합니다.
- 모든 실 운영 값은 [환경 구성 문서](./environment.md)에 따라 Secret 또는 시크릿 매니저에 저장합니다.
- 최소 권한 원칙(Least Privilege)을 적용해 토큰/비밀번호를 발급합니다.
- 분기별로 Secrets를 로테이션하며, 로테이션 절차를 문서화합니다.

### GitHub Secrets
| 이름 | 설명 |
| ---- | ---- |
| `GH_PAT` | GHCR 푸시 및 보호 브랜치 업데이트용 PAT (`repo`, `write:packages` 권한) |
| `ARGOCD_SERVER` | ArgoCD API 엔드포인트 |
| `ARGOCD_TOKEN` | `argocd account generate-token` 으로 발급한 토큰 |
| (옵션) `SLACK_WEBHOOK_URL` | 배포 알림 Webhook |

### Kubernetes Secrets
- `lalavisit-smtp-secret`: 이메일 발송 자격 증명
- `lalavisit-secrets`: 애널리틱스/채널 등 준-민감 정보
- `lalavisit-tls`: TLS 인증서 (cert-manager 또는 수동 업로드)

`kubectl get secret -n lalavisit` 로 생성 여부를 주기적으로 확인합니다.

## 3. TLS & HTTPS

### 옵션 A: cert-manager (권장)
1. cert-manager 설치  
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml
   ```
2. `k8s/cert-manager/cluster-issuer.yaml` 의 이메일을 실제 주소로 수정 후 적용
3. `k8s/overlays/production/kustomization.yaml` 에서 `ingress-tls-patch.yaml` 사용
4. 발급 상태 확인  
   ```bash
   kubectl get certificate -n lalavisit -w
   ```

### 옵션 B: 수동 인증서
1. 기존 인증서 또는 Certbot으로 `fullchain.pem`, `privkey.pem` 준비
2. Secret 생성  
   ```bash
   kubectl create secret tls lalavisit-tls \
     --cert=/path/to/fullchain.pem \
     --key=/path/to/privkey.pem \
     --namespace=lalavisit
   ```
3. 인증서 만료 30일 전에 교체 일정을 확보합니다.

## 4. 공개 저장소 점검

공개 전 다음 항목을 반드시 확인합니다.

- [ ] `.env*` 파일, 인증서, 로그 등 민감 파일이 커밋되어 있지 않습니다.
- [ ] 하드코딩된 개인 정보(이메일, 전화번호, 주소)가 존재하지 않습니다.
- [ ] `npm run lint`, `npm run build` 가 깨끗하게 통과합니다.
- [ ] README 및 `docs/` 문서에 서비스 맞춤 치환이 필요한 값을 명확히 표시했습니다.
- [ ] CI/CD에서 사용하는 Secret 이름과 필요 권한을 명시했습니다.
- [ ] GitHub Actions 로그에 민감 정보가 출력되지 않습니다.
- [ ] 저장소 설명, 토픽, 라이선스 정보가 최신 상태입니다.

## 5. 의존성 & 취약점 대응

- `npm audit`, GitHub Dependabot 경고를 월 1회 이상 확인합니다.
- 취약점이 Critical/High 등급일 때는 핫픽스 브랜치를 생성해 즉시 패치합니다.
- 의존성 업데이트 후 반드시 `npm run build` 로 리그레션을 확인합니다.

## 6. 사고 대응 프로세스

1. **탐지**: 사용자 제보, 모니터링, 보안 로그에서 이상 징후 감지
2. **평가**: 영향 범위와 민감도 평가, 즉시 차단이 필요한지 판단
3. **차단**: 토큰/비밀번호 회수, Ingress 차단, 임시 공지 등
4. **복구**: 패치 적용 후 CI/CD 재배포, 기능 정상화 검증
5. **보고**: 변경 사항 문서화, Root Cause 분석, 재발 방지 조치 마련

## 7. 감사 로그 & 모니터링

- Kubernetes, Ingress, 애플리케이션 로그를 중앙화된 위치(예: Loki, ELK)에 저장하는 것을 권장합니다.
- SMTP 실패 로그, 5xx 에러 비율, Lighthouse 스코어 변화를 주기적으로 점검합니다.

