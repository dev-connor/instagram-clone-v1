import { ApiProperty } from '@nestjs/swagger';

// POST/DELETE /posts/:postId/likes 응답 — 토글 후 최신 상태를 FE에 반환
export class LikeStatusDto {
  @ApiProperty({ format: 'uuid' })
  postId: string;

  @ApiProperty({ description: '본인의 좋아요 여부', example: true })
  isLikedByMe: boolean;

  @ApiProperty({ description: '해당 게시물의 총 좋아요 수', example: 25 })
  likeCount: number;
}
