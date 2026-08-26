# BE 에이전트 지시사항 (be-spec 단계)

> 대상: `be/` NestJS + TypeORM + MySQL + Swagger 프로젝트
> 참고: `docs/requirements.md` (기능 요구사항 전체), `docs/reference/*.png` (화면)
> 이 단계의 산출물: TypeORM 엔티티, DTO/컨트롤러 스텁, `npm run spec:export`로 생성한 `docs/spec/openapi.yaml`
> 이 문서는 설계 지시사항이며 실제 서비스 로직 구현은 다음 단계(be-impl)에서 진행합니다.

## 1. 엔티티 후보

### User
| 필드 | 타입 | 제약 |
|---|---|---|
| id | PK (uuid 또는 auto-increment) | |
| username | varchar(30) | unique, not null |
| email | varchar(255) | unique, not null |
| passwordHash | varchar | not null (평문 저장 금지, bcrypt 등 해시) |
| name | varchar(50) | nullable (실명/표시 이름) |
| bio | varchar(150) | nullable |
| profileImageUrl | varchar(500) | nullable |
| createdAt / updatedAt | timestamp | not null |

관계: `OneToMany` → Post, Comment, Like / `OneToMany` → Follow(followerId), Follow(followingId)

### Post
| 필드 | 타입 | 제약 |
|---|---|---|
| id | PK | |
| authorId | FK → User.id | not null, index |
| imageUrl | varchar(500) | not null |
| caption | varchar(2200) | nullable |
| location | varchar(100) | nullable (참고 이미지의 "평창국민체육관" 위치 표시용) |
| createdAt / updatedAt | timestamp | not null |

관계: `ManyToOne` → User(author), `OneToMany` → Comment, Like

### Comment
| 필드 | 타입 | 제약 |
|---|---|---|
| id | PK | |
| postId | FK → Post.id | not null, index |
| authorId | FK → User.id | not null, index |
| content | varchar(2200) | not null |
| parentCommentId | FK → Comment.id | nullable (대댓글 대비 자기참조, MVP 로직에서는 미사용 가능) |
| createdAt / updatedAt | timestamp | not null |

관계: `ManyToOne` → Post, `ManyToOne` → User(author)

### Like
| 필드 | 타입 | 제약 |
|---|---|---|
| id | PK | |
| userId | FK → User.id | not null |
| postId | FK → Post.id | not null |
| createdAt | timestamp | not null |

제약: **(userId, postId) 복합 unique** — 중복 좋아요 방지. Comment 좋아요는 MVP 범위 밖(테이블 분리해서 확장 여지만 남기고 이번 단계 구현 안 함).

### Follow
| 필드 | 타입 | 제약 |
|---|---|---|
| id | PK | |
| followerId | FK → User.id | not null (팔로우를 "누르는" 사용자) |
| followingId | FK → User.id | not null (팔로우 "당하는" 사용자) |
| createdAt | timestamp | not null |

제약: **(followerId, followingId) 복합 unique** — 중복 팔로우 방지. `followerId != followingId` 애플리케이션 레벨 검증(자기 자신 팔로우 금지) 필요.

## 2. 공통 DB 제약조건

- 모든 FK는 `ON DELETE CASCADE` 권장(User 삭제 시 연쇄 삭제) — 단, MVP에서 회원 탈퇴 기능은 없으므로 우선 CASCADE로 설정하고 이후 정책 논의
- `Like(userId, postId)`, `Follow(followerId, followingId)` 는 반드시 복합 unique index
- `Post.authorId`, `Comment.postId`, `Comment.authorId`, `Like.postId`, `Follow.followerId`, `Follow.followingId` 에 인덱스 (피드/카운트 조회 성능)
- `User.username`, `User.email` unique index
- 비밀번호는 절대 평문 저장 금지 (해시 컬럼명 `passwordHash`)

## 3. 필요한 API 목록

### Auth / User
| Method | Path | 설명 | 인증 |
|---|---|---|---|
| POST | /auth/signup | 회원가입 | X |
| POST | /auth/login | 로그인, 토큰 발급 | X |
| GET | /users/me | 내 프로필 조회 | O |
| PATCH | /users/me | 내 프로필 수정(name/bio/profileImageUrl) | O |
| GET | /users/:id | 특정 사용자 프로필 조회(postCount/followerCount/followingCount 포함) | O |

### Post
| Method | Path | 설명 | 인증 |
|---|---|---|---|
| POST | /posts | 게시물 작성 | O |
| GET | /posts/feed | 홈 피드(팔로우 중인 사용자 + 본인 게시물, 페이지네이션) | O |
| GET | /users/:id/posts | 특정 사용자의 게시물 목록(프로필 그리드) | O |
| GET | /posts/:id | 게시물 상세(likeCount, commentCount, isLikedByMe 포함) | O |
| DELETE | /posts/:id | 본인 게시물 삭제 | O |

### Comment
| Method | Path | 설명 | 인증 |
|---|---|---|---|
| POST | /posts/:postId/comments | 댓글 작성 | O |
| GET | /posts/:postId/comments | 댓글 목록(페이지네이션) | O |
| DELETE | /comments/:id | 본인 댓글 삭제 | O |

### Like
| Method | Path | 설명 | 인증 |
|---|---|---|---|
| POST | /posts/:postId/likes | 좋아요 등록 | O |
| DELETE | /posts/:postId/likes | 좋아요 취소 | O |
| GET | /posts/:postId/likes/count | 좋아요 수 조회 (Post 상세에 포함되므로 선택적) | O |

### Follow
| Method | Path | 설명 | 인증 |
|---|---|---|---|
| POST | /users/:id/follow | 팔로우 | O |
| DELETE | /users/:id/follow | 언팔로우 | O |
| GET | /users/:id/followers | 팔로워 목록 | O |
| GET | /users/:id/following | 팔로잉 목록 | O |

## 4. 설계 시 참고사항

- 페이지네이션: 피드/댓글/팔로워·팔로잉 목록 API는 `cursor` 또는 `page`+`limit` 쿼리 파라미터로 설계 (openapi.yaml에 반영)
- `GET /posts/:id`, `GET /posts/feed` 응답에는 FE가 좋아요 하트 상태를 즉시 렌더링할 수 있도록 `likeCount`, `isLikedByMe` 필드를 포함
- `GET /users/:id` 응답에는 `postCount`, `followerCount`, `followingCount`, 그리고 `isFollowedByMe`(본인이 이 사용자를 팔로우 중인지) 포함 — 프로필 화면의 "팔로우"/"팔로잉" 버튼 상태 분기용
- DTO에는 class-validator 데코레이터로 입력 검증(username 길이, caption 길이, content 필수 등) 적용
- 이번 단계에서는 엔티티 + DTO + 컨트롤러 스텁(라우팅/Swagger 데코레이터)까지만 작성하고, 서비스 로직 실제 구현은 be-impl 단계에서 진행
- 작업 완료 후 `npm run spec:export`로 `docs/spec/openapi.yaml` 생성 필수 (FE가 이 계약을 보고 작업)
