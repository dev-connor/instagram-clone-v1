# docs/spec

`openapi.yaml`은 BE 에이전트가 3단계(DB 설계 + Spec 작성)에서 생성합니다. 지금은 비어 있는 게 정상입니다.

생성 방법 (BE 워크트리에서):

```bash
cd be
npm run spec:export   # Swagger 데코레이터 → docs/spec/openapi.yaml
```

FE 태스크는 이 파일이 main에 merge된 이후에 새로 생성해야 합니다.
