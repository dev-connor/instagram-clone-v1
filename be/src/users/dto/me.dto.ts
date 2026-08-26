import { ApiProperty } from '@nestjs/swagger';

// GET/PATCH /users/me 응답 — 본인 정보이므로 email 포함
export class MeDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'gildong' })
  username: string;

  @ApiProperty({ example: 'gildong@example.com' })
  email: string;

  @ApiProperty({ example: '홍길동', nullable: true })
  name: string | null;

  @ApiProperty({ example: '안녕하세요 :)', nullable: true })
  bio: string | null;

  @ApiProperty({
    example: 'https://cdn.example.com/avatars/gildong.jpg',
    nullable: true,
  })
  profileImageUrl: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
