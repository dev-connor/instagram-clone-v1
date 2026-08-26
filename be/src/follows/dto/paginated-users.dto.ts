import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { UserSummaryDto } from '../../users/dto/user-summary.dto';

// GET /users/:id/followers, GET /users/:id/following 목록 응답
export class PaginatedUsersDto {
  @ApiProperty({ type: () => [UserSummaryDto] })
  items: UserSummaryDto[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
