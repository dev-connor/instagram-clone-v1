import { ApiProperty } from '@nestjs/swagger';

// GET /users/:id 응답 — 프로필 화면용 카운트 + 팔로우 상태 포함
export class UserProfileDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'gildong' })
  username: string;

  @ApiProperty({ example: '홍길동', nullable: true })
  name: string | null;

  @ApiProperty({ example: '안녕하세요 :)', nullable: true })
  bio: string | null;

  @ApiProperty({
    example: 'https://cdn.example.com/avatars/gildong.jpg',
    nullable: true,
  })
  profileImageUrl: string | null;

  @ApiProperty({ description: '작성한 게시물 수', example: 42 })
  postCount: number;

  @ApiProperty({ description: '팔로워 수', example: 128 })
  followerCount: number;

  @ApiProperty({ description: '팔로잉 수', example: 87 })
  followingCount: number;

  @ApiProperty({
    description: '요청한 본인이 이 사용자를 팔로우 중인지 여부',
    example: false,
  })
  isFollowedByMe: boolean;
}
