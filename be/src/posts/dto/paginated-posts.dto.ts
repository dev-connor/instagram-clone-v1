import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { PostResponseDto } from './post-response.dto';

// GET /posts/feed, GET /users/:id/posts 목록 응답
export class PaginatedPostsDto {
  @ApiProperty({ type: () => [PostResponseDto] })
  items: PostResponseDto[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
