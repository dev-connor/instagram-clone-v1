import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

// PATCH /users/me — name/bio/profileImageUrl 만 수정 가능
export class UpdateProfileDto {
  @ApiPropertyOptional({ example: '홍길동', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ example: '안녕하세요 :)', maxLength: 150 })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  bio?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/avatars/gildong.jpg',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  profileImageUrl?: string;
}
