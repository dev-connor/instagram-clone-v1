import { ApiProperty } from '@nestjs/swagger';

// GET /posts/:postId/likes/count 응답
export class LikeCountDto {
  @ApiProperty({ format: 'uuid' })
  postId: string;

  @ApiProperty({ description: '해당 게시물의 총 좋아요 수', example: 25 })
  likeCount: number;
}
