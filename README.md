# instagram-clone — PM·BE·FE 병렬 개발 데모

"AI 시대 개발법" 멘토링용 실습 프로젝트. PM/BE/FE 세 페르소나가 OpenAPI Spec을 계약으로 삼아
병렬로 개발하는 흐름을 emdash로 관찰하며 시연한다.

- **BE**: NestJS + TypeORM + MySQL, Swagger로 API 문서를 watch 모드로 계속 확인
- **FE**: Flutter, Dart MCP로 에이전트가 직접 hot reload + 화면 확인
- **오케스트레이션**: [emdash](https://github.com/generalaction/emdash)로 여러 에이전트 태스크를 병렬 관찰

## 구조

```
instagram-clone/
├── be/                          # NestJS + TypeORM + MySQL + Swagger (스캐폴드 완료)
├── fe/                          # Flutter — 로컬에서 `flutter create .` 필요 (fe/README.md 참고)
├── docs/
│   ├── reference/                # PM에게 전달할 참고 이미지
│   ├── spec/                     # BE가 생성하는 openapi.yaml
│   └── 03-instagram-clone-demo-runbook.md   # 녹화용 순차 가이드
├── docker-compose.yml            # MySQL
└── .emdash.json
```

## 시작하기

```bash
docker compose up -d                 # MySQL 기동
cd fe && flutter create . && cd ..   # FE 스캐폴드 (Flutter 설치된 환경에서)
```

이후 순서는 [`docs/03-instagram-clone-demo-runbook.md`](docs/03-instagram-clone-demo-runbook.md) 참고.

## BE 단독 실행

```bash
cd be
cp .env.example .env
npm run start:dev        # http://localhost:3000/api 에서 Swagger 확인
```
