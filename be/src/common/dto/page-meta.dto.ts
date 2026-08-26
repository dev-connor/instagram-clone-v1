import { ApiProperty } from '@nestjs/swagger';

// 목록 응답에 공통으로 포함되는 페이지 메타 정보
export class PageMetaDto {
  @ApiProperty({ description: '현재 페이지 번호', example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 20 })
  limit: number;

  @ApiProperty({ description: '전체 항목 수', example: 137 })
  totalItems: number;

  @ApiProperty({ description: '전체 페이지 수', example: 7 })
  totalPages: number;

  @ApiProperty({ description: '다음 페이지 존재 여부', example: true })
  hasNextPage: boolean;
}
