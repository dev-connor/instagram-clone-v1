import { ApiProperty } from '@nestjs/swagger';

// POST/DELETE /users/:id/follow 응답 — 토글 후 최신 상태를 FE에 반환
export class FollowStatusDto {
  @ApiProperty({ description: '대상 사용자 id', format: 'uuid' })
  userId: string;

  @ApiProperty({ description: '본인이 이 사용자를 팔로우 중인지 여부', example: true })
  isFollowedByMe: boolean;

  @ApiProperty({ description: '대상 사용자의 팔로워 수', example: 129 })
  followerCount: number;
}
