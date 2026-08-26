# docs/reference

PM 에이전트에게 1단계에서 전달할 인스타그램 참고 이미지를 여기에 넣으세요.

```bash
cp ~/Downloads/인스타예시.png docs/reference/instagram-ref.png
git add docs/reference/instagram-ref.png
git commit -m "docs: 인스타그램 참고 이미지 추가"
```

emdash는 태스크마다 git worktree를 새로 파기 때문에, 이미지가 이후 태스크(PM/BE/FE)에서도 보이려면
**커밋된 상태**여야 합니다.
