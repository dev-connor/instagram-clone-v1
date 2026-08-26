import { ApiProperty } from '@nestjs/swagger';
import { UserSummaryDto } from '../../users/dto/user-summary.dto';

// GET /posts/:id, GET /posts/feed, GET /users/:id/posts 항목 응답
// FE가 하트 상태를 즉시 렌더링할 수 있도록 likeCount / isLikedByMe 포함
export class PostResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ type: () => UserSummaryDto })
  author: UserSummaryDto;

  @ApiProperty({ example: 'https://cdn.example.com/posts/abc.jpg' })
  imageUrl: string;

  @ApiProperty({ example: '오늘의 훈련 🏋️', nullable: true })
  caption: string | null;

  @ApiProperty({ example: '평창국민체육관', nullable: true })
  location: string | null;

  @ApiProperty({ description: '좋아요 수', example: 24 })
  likeCount: number;

  @ApiProperty({ description: '댓글 수', example: 3 })
  commentCount: number;

  @ApiProperty({
    description: '요청한 본인이 이 게시물에 좋아요를 눌렀는지 여부',
    example: false,
  })
  isLikedByMe: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
