# fe — Flutter 클라이언트 (스캐폴드 전)

이 저장소를 만든 환경에는 Flutter SDK가 없어서 `flutter create`를 대신 실행하지 못했습니다.
Flutter가 설치된 환경(로컬)에서 아래 명령으로 이 폴더에 바로 스캐폴드하세요.

```bash
cd fe
flutter create .
```

기존 `README.md`는 `flutter create`가 덮어쓰므로, 필요하면 이 내용을 다른 곳에 백업해두세요.

## FE 에이전트 작업 순서 (`docs/03-instagram-clone-demo-runbook.md` 참고)

1. `../docs/spec/openapi.yaml`이 존재하는지 확인 (BE가 3단계에서 생성)
2. Spec을 읽고 화면별 Dart 모델 + mock repository 작성 (코드젠 툴 설치 없이 손으로)
3. 코드 수정마다 Dart MCP `hot_reload` 도구로 반영 → `widget_inspector` screenshot으로 스스로 확인
4. `flutter run -d chrome`으로 실행하며 화면 확인
