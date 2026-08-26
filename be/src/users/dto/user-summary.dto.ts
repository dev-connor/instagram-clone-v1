import { ApiProperty } from '@nestjs/swagger';

// 게시물 작성자 / 댓글 작성자 / 팔로워·팔로잉 목록 등에서 재사용하는 공개 사용자 요약
export class UserSummaryDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'gildong' })
  username: string;

  @ApiProperty({ example: '홍길동', nullable: true })
  name: string | null;

  @ApiProperty({
    example: 'https://cdn.example.com/avatars/gildong.jpg',
    nullable: true,
  })
  profileImageUrl: string | null;
}
