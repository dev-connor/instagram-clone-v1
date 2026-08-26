import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { CommentResponseDto } from './comment-response.dto';

// GET /posts/:postId/comments 목록 응답
export class PaginatedCommentsDto {
  @ApiProperty({ type: () => [CommentResponseDto] })
  items: CommentResponseDto[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
