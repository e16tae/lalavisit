# Sealed Secrets

이 디렉터리에는 `kubeseal`을 사용해 생성한 `SealedSecret` 매니페스트를 저장합니다. 실제 배포 전에 아래 절차를 따라 파일을 생성하고 커밋하세요.

1. 클러스터에 [Sealed Secrets Controller](https://github.com/bitnami-labs/sealed-secrets) 설치
2. 로컬에 `kubeseal` CLI 설치
3. `.env.production` 파일(또는 원하는 환경 변수 파일) 준비
4. 다음 스크립트 실행:
   ```bash
   ./scripts/seal-secrets.sh \
     --namespace lalavisit \
     --name lalavisit-secrets \
     --env-file .env.production \
     --out k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml
   ```
5. 생성된 `*.sealedsecret.yaml` 파일을 커밋하여 배포 파이프라인에 포함

> `lalavisit-secrets.sealedsecret.yaml.example` 파일은 참조용 템플릿입니다. 실제 배포 시에는 `encryptedData` 값을 `kubeseal`이 생성한 값으로 대체해야 합니다.
