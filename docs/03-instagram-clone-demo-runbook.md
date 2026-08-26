# 실전 데모 런북 — 인스타그램 클론 PM→BE→FE 병렬 개발 (emdash)

> 대상: NestJS(TypeORM/MySQL) BE + Flutter FE, OpenAPI Spec을 계약으로 병렬 개발
> 작성일: 2026-08-26 · OBS 녹화용 순차 가이드

---

## 0. 이미지 위치

`docs/reference/instagram-ref.png`. emdash는 태스크마다 git worktree를 새로 파기 때문에,
이미지가 이후 태스크에서도 보이려면 **커밋된 상태**여야 한다. (`docs/reference/README.md` 참고)

## 1. 사전 준비

```bash
docker compose up -d          # MySQL 기동
```

emdash 첫 화면에서 **"Open project"**로 이 폴더(`instagram-clone`)를 연다.
("Create repository"는 새 빈 GitHub 레포를 만드는 옵션이라 여기선 해당 없음)

## 2. 5단계 사이클 → emdash 태스크 매핑

| # | emdash 태스크 | 프롬프트 핵심 | 산출물 |
|---|---|---|---|
| 1 | `pm-spec` | `docs/reference/instagram-ref.png`와 요구사항을 보고 PM으로서 `docs/requirements.md`, `docs/be-brief.md` 작성 | requirements.md, be-brief.md |
| 2 | (사람) | pm-spec 결과 리뷰 → merge | main 반영 |
| 3 | `be-spec` | `docs/be-brief.md` 참고, User/Post/Comment/Like/Follow TypeORM 엔티티 설계 + DTO/컨트롤러 스텁 + `npm run spec:export`로 `docs/spec/openapi.yaml` 생성 | 엔티티, openapi.yaml |
| 4 | (사람) | be-spec 결과 리뷰 → **main에 merge (필수, FE 태스크 생성 전에)** | main 반영 |
| 5 | `be-impl` + `fe-scaffold` (동시 생성) | BE: spec대로 서비스/리포지토리 실구현 / FE: spec 읽고 Dart 모델 + mock repository로 화면 구현 | 병렬 진행 |

4번을 건너뛰고 FE 태스크를 먼저 만들면 그 worktree에 spec이 없다 — 반드시 순서를 지킬 것.

## 3. BE — Swagger로 계속 보기

```bash
cd <be-impl worktree>/be
npm run start:dev        # nest --watch, 저장마다 재시작
```

브라우저에 `http://localhost:3000/api` 고정 — 저장 → 재시작(1~2초) → F5.

## 4. FE — Flutter 핫리로드로 계속 보기

```bash
cd <fe-scaffold worktree>/fe
flutter run -d chrome
```

에이전트 프롬프트에 추가: "코드 수정마다 Dart MCP `hot_reload` 도구로 반영하고
`widget_inspector` screenshot으로 스스로 확인해라." → 사람이 `r`을 안 눌러도 저장마다 자동 반영.

## 5. emdash로 관찰

좌측 카드가 `pm-spec` → `be-spec` → `be-impl`/`fe-scaffold` 순서로 쌓이는 걸 그대로 캡처.
두 병렬 태스크를 동시에 열어 로그 스트림을 나란히 보여주면 "혼자서 팀처럼" 스토리가 화면으로 증명됨.

## 6. OBS 씬 구성

4분할: **emdash 대시보드 / Swagger UI / Flutter Chrome / 터미널 로그**. 소스 전환 없이
씬 하나에 배치해두고 단축키로 포커스만 바꾸면 편집 없이 매끄럽다.
