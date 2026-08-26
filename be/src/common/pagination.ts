import { PageMetaDto } from './dto/page-meta.dto';

// page/limit → TypeORM skip/take 변환
export function toSkipTake(page: number, limit: number): {
  skip: number;
  take: number;
} {
  return { skip: (page - 1) * limit, take: limit };
}

// 목록 조회 결과로 PageMetaDto 구성
export function buildPageMeta(
  totalItems: number,
  page: number,
  limit: number,
): PageMetaDto {
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
  };
}
